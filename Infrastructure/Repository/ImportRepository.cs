using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;

namespace Infrastructure.Repository;
public class ImportRepository : BaseRepository<Import>, IImportRepository
{
    public ImportRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public IEnumerable<ImportReadDTO> GetAllImports()
    {
        return (from i in GetDbSet() join au in GetDbContext().AdminUsers on i.CheckAdmin equals au.Id orderby i.Id descending
                select new ImportReadDTO
                {
                    Id = i.Id,
                    DateImport = i.DateImport,
                    CheckAdmin = i.CheckAdmin,
                    AdminName = au.FullName,
                    Total = i.Total
                }).ToList();
    }

    public IEnumerable<BillDetailAdminDTO> GetAllImportDetails()
    {
        return (from i in GetDbContext().ImportDetails
                join pd in GetDbContext().ProductDetails on i.Sku equals pd.Sku
                join pc in GetDbContext().ProductColors on pd.ProductColorId equals pc.Id
                join c in GetDbContext().Colors on pc.ColorCode equals c.Code
                join p in GetDbContext().Products on pc.ProductId equals p.Id
                select new BillDetailAdminDTO
                {
                    BillId = (int)i.ImportId,
                    Sku = i.Sku,
                    Name = p.Name,
                    Color = c.Name,
                    Size = pd.Size,
                    Price = i.Price,
                    Quantity = i.Quantity
                }).ToList();
    }

    public void Insert(Import im)
    {
        im.DateImport = DateTime.Now;
        GetDbSet().Add(im);
    }

    public void Insert(ImportDetail importDetail)
    {
        GetDbContext().ImportDetails.Add(importDetail);
    }
}