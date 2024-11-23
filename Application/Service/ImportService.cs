using Application.Interface;
using Core.Entity;
using Core.DTO;
using Core.Interface;

namespace Application.Service;

public class ImportService : IImportService
{
    private readonly IUnitOfWork _unitOfWork;

    public ImportService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    
    public IEnumerable<ImportReadDTO> GetAllImports()
    {
        return _unitOfWork.Imports.GetAllImports();
    }

    public IEnumerable<BillDetailAdminDTO> GetAllImportDetails()
    {
        return _unitOfWork.Imports.GetAllImportDetails();
    }

    public async Task<bool> Insert(Import im)
    {
        _unitOfWork.Imports.Insert(im);
        
        foreach (var imDetail in im.ImportDetails)
        {
            _unitOfWork.Imports.Insert(imDetail);
            await _unitOfWork.ProductDetails.ChangeQuantity(imDetail.Sku, (int)imDetail.Quantity);
        }

        return await _unitOfWork.SaveChangesAsync();
    }
}