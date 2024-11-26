using Core.DTO;
using Core.Entity;
using Core.Interface;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository;

public class ProductDetailRepository : BaseRepository<ProductDetail>, IProductDetailRepository
{
    public ProductDetailRepository(AtWebContext dbContext) : base(dbContext)
    {
    }
    
    private static string GetImageCode(string path)
    {
        int length = path.IndexOf('.') - path.IndexOf('-') - 1;
        return path.Substring(path.IndexOf('-') + 1, length);
    }

    public IEnumerable<ProductDetailDTO> GetProductByUrlName(string urlName)
    {
        var detail = (from p in GetDbContext().Products
                      join pc in GetDbContext().ProductColors on p.Id equals pc.ProductId
                      join c in GetDbContext().Colors on pc.ColorCode equals c.Code
                      join pd in GetDbContext().ProductDetails on pc.Id equals pd.ProductColorId
                      join pi in GetDbContext().ProductImages on pc.Id equals pi.ProductColorId
                      where p.UrlName == urlName
                      orderby pd.Id
                      select new ProductDetailDTO
                      {
                          Id = p.Id,
                          Sku = pd.Sku,
                          Name = p.Name,
                          Color = c.Name,
                          Size = pd.Size,
                          Price = pd.Price,
                          Image = GetImageCode(pi.Image),
                          Quantity = pd.Quantity
                      }); ;
        return detail;
    }

    public IEnumerable<ProductImage> GetProductImagesByUrlName(string urlName)
    {
        var images = (from p in GetDbContext().Products
                      join c in GetDbContext().ProductColors on p.Id equals c.ProductId
                      join i in GetDbContext().ProductImages on c.Id equals i.ProductColorId
                      where p.UrlName == urlName
                      select i);
        return images;
    }

    public async Task<ProductDetail> GetProductDetailBySku(string sku)
    {
        var productDetail = await GetDbSet().FirstAsync(s => s.Sku == sku);
        return productDetail;
    }

    public IEnumerable<ProductDetail> GetProductDetailByColorId(int id)
    {
        var detail = GetDbSet().Include(d => d.ProductColor).ThenInclude(c => c.ProductImages).Where(c => c.ProductColor.Id == id).ToList();
        return detail;
    }

    public IEnumerable<ProductImage> GetProductImagesByColorId(int id)
    {
        var productImage = GetDbContext().ProductImages.Where(s => s.ProductColorId == id).ToList();
        return productImage;
    }

    public async Task<bool> CheckChangeQuantity(string sku, int change)
    {
        var productDetail = await GetProductDetailBySku(sku);
        return productDetail.Quantity + change >= 0;
    }

    public async Task<bool> ChangeQuantity(string sku, int change)
    {
        var productDetail = await GetProductDetailBySku(sku);
        productDetail.Quantity += change;
        return true;
    }

    public async Task<bool> Lock(string sku)
    {
        var productDetail = await GetProductDetailBySku(sku);
        productDetail.IsActive = false;
        return true;
    }

    public async Task<bool> Unlock(string sku)
    {
        var productDetail = await GetProductDetailBySku(sku);
        productDetail.IsActive = true;
        return true;
    }
}
