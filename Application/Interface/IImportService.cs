using Core.Entity;
using Core.DTO;

namespace Application.Interface;

public interface IImportService
{
    IEnumerable<ImportReadDTO> GetAllImports();

    IEnumerable<BillDetailAdminDTO> GetAllImportDetails();

    Task<bool> Insert(Import im);
}