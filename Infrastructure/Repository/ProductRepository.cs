using Core.DTO;
using Core.Entity;
using Core.Interface;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Repository;

public class ProductRepository : BaseRepository<Product>, IProductRepository
{
    public ProductRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<Product>> GetAllProducts(string search, bool desc = false, Expression<Func<Product, object>> expression = null)
    {
        IQueryable<Product> productQuery;

        if (search == "")
            productQuery = GetDbSet().Include(p => p.ProductColors).ThenInclude(p => p.ProductImages).Include(p => p.ProductSports);
        else
            productQuery = GetDbSet().Include(p => p.ProductColors).ThenInclude(p => p.ProductImages).Include(p => p.ProductSports).Where(p => p.Name.Contains(search));

        if (expression == null) return await productQuery.ToListAsync();
        if (desc) return await productQuery.OrderByDescending(expression).ToListAsync();
        return await productQuery.OrderBy(expression).ToListAsync();
    }

    public List<FilterDTO> GetAllFilter()
    {
        List<FilterDTO> filters = new List<FilterDTO>();
        string[] brand = (from b in GetDbContext().Brands select b.Name).ToArray();
        filters.Add(new FilterDTO { Title = "Thương hiệu", Details = brand });

        var sport = (from s in GetDbContext().Sports where s.Id > 0 select s.Name).ToArray();
        filters.Add(new FilterDTO { Title = "Thể thao", Details = sport });

        var clothesSize = (from p in GetDbSet()
                           join pc in GetDbContext().ProductColors on p.Id equals pc.ProductId
                           join d in GetDbContext().ProductDetails on pc.Id equals d.ProductColorId
                           where p.CategoryId < 4
                           select d.Size).Distinct().ToArray();
        filters.Add(new FilterDTO { Title = "Size quần áo", Details = clothesSize });

        var shoeSize = (from p in GetDbContext().Products
                        join c in GetDbContext().ProductColors on p.Id equals c.ProductId
                        join d in GetDbContext().ProductDetails on c.Id equals d.ProductColorId
                        where p.CategoryId == 4
                        orderby d.Size
                        select d.Size).Distinct().ToArray();
        filters.Add(new FilterDTO { Title = "Size giày", Details = shoeSize });

        var colors = (from c in GetDbContext().Colors select c.Name).Distinct().ToArray();
        filters.Add(new FilterDTO { Title = "Màu sắc", Details = colors });

        return filters;
    }

    private Product GetById(int id)
    {
        return GetDbSet().First(p => p.Id == id);
    }

    public IEnumerable<Product> GetAllProducts()
    {
        return GetDbSet().Include(p => p.ProductColors).ThenInclude(p => p.ProductImages)
                         .Include(p => p.ProductSports).ToList();
    }

    public void Insert(Product product)
    {
        GetDbSet().Add(product);
    }

    public void Update(Product product)
    {
        var productUpdate = GetById(product.Id);

        productUpdate.Name = product.Name;
        productUpdate.UrlName = product.UrlName;
        productUpdate.BrandId = product.BrandId;
        productUpdate.CategoryId = product.CategoryId;
        productUpdate.Description = product.Description;
        productUpdate.Gender = product.Gender;
        productUpdate.IsChildren = product.IsChildren;

        GetDbSet().Update(productUpdate);
    }

    public void Insert(List<ProductSport> productSports)
    {
        GetDbContext().ProductSports.AddRange(productSports);
    }

    public void Update(List<ProductSport> productSports, int id)
    {
        Console.WriteLine("hello productsport");
        var oldSport = GetDbContext().ProductSports.Where(ps => ps.ProductId == id).ToList();
        if (oldSport.Any()) GetDbContext().ProductSports.RemoveRange(oldSport);

        GetDbContext().ProductSports.AddRange(productSports);
    }

    public void Lock(int id)
    {
        var product = GetById(id);
        product.IsActive = false;
    }

    public void Unlock(int id)
    {
        var product = GetById(id);
        product.IsActive = true;
    }
}
