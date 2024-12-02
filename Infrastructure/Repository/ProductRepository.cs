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

    public async Task<IEnumerable<Product>> GetAllProducts(Expression<Func<Product, bool>> expression = null)
    {
        if (expression == null) return await GetDbSet().Include(p => p.ProductColors).ThenInclude(p => p.ProductImages).Include(p => p.ProductSports).ToListAsync();
        else return await GetDbSet().Include(p => p.ProductColors).ThenInclude(p => p.ProductImages).Include(p => p.ProductSports).Where(expression).ToListAsync();
    }

    public async Task<IEnumerable<Product>> GetAllProductsRead(List<SearchListDTO>? searchDTO = null, bool desc = false, Expression<Func<Product, object>> expression = null)
    {

        var currentDate = DateTime.Now;
        IQueryable<Product> productQuery = GetDbSet().Include(p => p.ProductColors).ThenInclude(p => p.ProductImages)
            .Include(p => p.ProductSports).Include(p => p.PromotionDetails);
        List<string> sizeList = new();

        if (searchDTO != null)
        {
            int search = searchDTO.FindIndex(s => s.Param == "search");
            if (search >= 0 && !string.IsNullOrEmpty(searchDTO[search].DetailString))
                productQuery = productQuery.Where(p => p.Name.Contains(searchDTO[search].DetailString));

            int price = searchDTO.FindIndex(s => s.Param == "price");
            if (price >= 0 && !string.IsNullOrEmpty(searchDTO[price].DetailString))
            {
                searchDTO[price].DetailArray = searchDTO[price].DetailString!.Split("_").ToList();
                productQuery = productQuery.Where(p =>
                    (!searchDTO[price].DetailArray!.Contains("1") || (p.Price >= 0 && p.Price < 500000)) &&
                    (!searchDTO[price].DetailArray!.Contains("2") || (p.Price >= 500000 && p.Price < 10000000)) &&
                    (!searchDTO[price].DetailArray!.Contains("3") || (p.Price >= 1000000))
                );
            }

            int brand = searchDTO.FindIndex(s => s.Param == "brand");
            if (brand >= 0 && !string.IsNullOrEmpty(searchDTO[brand].DetailString))
            {
                searchDTO[brand].DetailArray = searchDTO[brand].DetailString!.Split("_").ToList();
                productQuery = productQuery.Where(p => searchDTO[brand].DetailArray!.Contains(p.BrandId.ToString()));
            }

            int sport = searchDTO.FindIndex(s => s.Param == "sport");
            if (sport >= 0 && !string.IsNullOrEmpty(searchDTO[sport].DetailString))
            {
                searchDTO[sport].DetailArray = searchDTO[sport].DetailString!.Split("_").ToList();
                searchDTO[sport].DetailArray!.Insert(0, "0");
                productQuery = productQuery.Where(p => p.ProductSports.Any(ps => searchDTO[sport].DetailArray!.Contains(ps.SportId.ToString())));
            }

            int clothSize = searchDTO.FindIndex(s => s.Param == "cloth");
            if (clothSize >= 0 && !string.IsNullOrEmpty(searchDTO[clothSize].DetailString))
                sizeList.AddRange(searchDTO[clothSize].DetailString!.Split("_").ToList());

            int shoeSize = searchDTO.FindIndex(s => s.Param == "shoe");
            if (shoeSize >= 0 && !string.IsNullOrEmpty(searchDTO[shoeSize].DetailString))
                sizeList.AddRange(searchDTO[shoeSize].DetailString!.Split("_").ToList());

            if (sizeList.Any()) productQuery = productQuery.Where(p => p.ProductColors.Any(pc => pc.ProductDetails.Any(pd => sizeList.Contains(pd.Size))));

            int color = searchDTO.FindIndex(s => s.Param == "color");
            if (color >= 0 && !string.IsNullOrEmpty(searchDTO[color].DetailString))
            {
                searchDTO[color].DetailArray = searchDTO[color].DetailString!.Split("_").ToList();
                productQuery = productQuery.Where(p => p.ProductColors.Any(ps => searchDTO[color].DetailArray!.Contains(ps.ColorCode)));
            }

            int gender = searchDTO.FindIndex(s => s.Param == "gender");
            if (gender >= 0 && !string.IsNullOrEmpty(searchDTO[gender].DetailString))
            {
                searchDTO[gender].DetailArray = searchDTO[gender].DetailString!.Split("_").ToList();
                searchDTO[gender].DetailArray!.Add("2");
                foreach (var s in searchDTO[gender].DetailArray) Console.WriteLine(s);
                productQuery = productQuery.Where(p => searchDTO[gender].DetailArray!.Contains(p.Gender.ToString()));
            }
        }

        if (expression == null) return await productQuery.ToListAsync();
        if (desc) return await productQuery.OrderByDescending(expression).ToListAsync();
        return await productQuery.OrderBy(expression).ToListAsync();
    }

    public List<FilterListDTO> GetAllFilter()
    {
        List<FilterListDTO> filters = new List<FilterListDTO>();
        var brand = (from b in GetDbContext().Brands select new FilterDTO { Id = b.Id.ToString(), Name = b.Name }).ToArray();
        filters.Add(new FilterListDTO { Params = "brand", Title = "Thương hiệu", Details = brand });

        var sport = (from s in GetDbContext().Sports where s.Id > 0 select new FilterDTO { Id = s.Id.ToString(), Name = s.Name }).ToArray();
        filters.Add(new FilterListDTO { Params = "sport", Title = "Thể thao", Details = sport });

        var clothSize = (from p in GetDbSet()
                         join pc in GetDbContext().ProductColors on p.Id equals pc.ProductId
                         join d in GetDbContext().ProductDetails on pc.Id equals d.ProductColorId
                         where p.CategoryId < 4
                         select new FilterDTO { Id = d.Size, Name = d.Size }).Distinct().ToArray();
        filters.Add(new FilterListDTO { Params = "cloth", Title = "Size quần áo", Details = clothSize });

        var shoeSize = (from p in GetDbContext().Products
                        join c in GetDbContext().ProductColors on p.Id equals c.ProductId
                        join d in GetDbContext().ProductDetails on c.Id equals d.ProductColorId
                        where p.CategoryId == 4
                        orderby d.Size
                        select new FilterDTO { Id = d.Size, Name = d.Size }).Distinct().ToArray();
        filters.Add(new FilterListDTO { Params = "shoe", Title = "Size giày", Details = shoeSize });

        var colors = (from c in GetDbContext().Colors select new FilterDTO { Id = c.Code, Name = c.Name }).Distinct().ToArray();
        filters.Add(new FilterListDTO { Params = "color", Title = "Màu sắc", Details = colors });

        filters.Add(new FilterListDTO
        {
            Params = "gender",
            Title = "Giới tính",
            Details = new FilterDTO[]
        {
            new FilterDTO{ Id = "0", Name = "Nam" },
            new FilterDTO{ Id = "1", Name = "Nữ" }
        }
        });

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
