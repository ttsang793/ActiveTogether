using Core.DTO;
using Core.Entity;
using Core.Interface;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Repository;

public class ProductColorRepository : BaseRepository<ProductColor>, IProductColorRepository
{
    private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "..\\reactapp\\src\\Images\\product");

    public ProductColorRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public int GetProductColorLength()
    {
        return GetDbSet().ToList().Count;
    }

    public IEnumerable<ProductColor> GetProductColorByProductId(int productId)
    {
        var color = GetDbSet().Include(c => c.ColorCodeNavigation).Include(c => c.ProductImages).Where(p => p.ProductId == productId).ToList();
        return color;
    }    

    private ProductColor GetById(int id)
    {
        return GetDbSet().First(s => s.Id == id);
    }

    public void Insert(ProductColor productColor)
    {
        productColor.IsActive = true;
        GetDbSet().Add(productColor);
    }

    public void Update(ProductColor productColor)
    {
        var pc = GetById(productColor.Id);
        pc.ColorCode = productColor.ColorCode;
        GetDbSet().Update(pc);
    }

    public void Lock(int id)
    {
        var productColor = GetById(id);
        productColor.IsActive = false;
    }

    public void Unlock(int id)
    {
        var productColor = GetById(id);
        productColor.IsActive = true;
    }

    private async Task DeleteImage(string name)
    {
        try
        {
            string[] files = Directory.GetFiles(_uploadDirectory, name + ".*");
            if (files.Any())
                foreach (string file in files) File.Delete(file);
        }
        catch { }
    }

    public async Task<bool> UploadImages(IFormFile[] files, int id, int productId)
    {
        GetDbContext().ProductImages.RemoveRange(GetDbContext().ProductImages.Where(p => p.ProductColorId == id));
        if (files == null || files.Length == 0) return false;

        for (int i = 0; i < files.Length; i++)
        {
            var file = files[i];
            var fileName = productId + "_" + id + "-" + (i + 1) + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_uploadDirectory, fileName);
            GetDbContext().ProductImages.Add(new ProductImage { ProductColorId = id, Image = "/src/Images/product/" + fileName });
            await DeleteImage(fileName);


            if (file.FileName.StartsWith("@__#"))
            {
                string oldName = Path.Combine(_uploadDirectory, file.FileName[(file.FileName.LastIndexOf("/") + 1)..]);
                File.Move(oldName, filePath);
            }
            else
            {
                using var stream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(stream);
            }
        }

        return true;
    }
}
