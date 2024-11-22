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

    public IEnumerable<ProductReadDTO> GetAllProductsDefault(string search)
    {
        var productList = (from p in GetDbContext().Products
                           join c in GetDbContext().ProductColors on p.Id equals c.ProductId
                           join i in GetDbContext().ProductImages on c.Id equals i.ProductColorId
                           join d in GetDbContext().ProductDetails on c.Id equals d.ProductColorId
                           where i.Image!.Contains("-1.") && p.Name.ToLower().Contains(search)
                           group new { p, c, i, d } by p.Id into g
                           select new ProductReadDTO
                           {
                               Id = g.Key,
                               Name = g.Select(x => x.p.Name).First(),
                               UrlName = g.Select(x => x.p.UrlName).First(),
                               BrandId = g.Select(x => x.p.BrandId).First(),
                               CategoryId = g.Select(x => x.p.CategoryId).First(),
                               Gender = g.Select(x => x.p.Gender).First(),
                               IsChildren = g.Select(x => x.p.IsChildren).First(),
                               Image = g.Select(x => x.i.Image).First(),
                               Price = g.Select(x => x.d.Price).First(),
                               OldPrice = g.Select(x => x.d.OldPrice).First(),
                               Quantity = g.Sum(x => x.d.Quantity)
                           });

        return productList;
    }

    public IEnumerable<ProductReadDTO> GetAllProductsPriceAsc(string search)
    {

        var productList = (from p in GetDbContext().Products
                           join c in GetDbContext().ProductColors on p.Id equals c.ProductId
                           join i in GetDbContext().ProductImages on c.Id equals i.ProductColorId
                           join d in GetDbContext().ProductDetails on c.Id equals d.ProductColorId
                           where i.Image!.Contains("-1.") && (p.Name.ToLower().Contains(search))
                           group new { p, c, i, d } by p.Id into g
                           orderby g.Select(x => x.d.Price).FirstOrDefault()
                           select new ProductReadDTO
                           {
                               Id = g.Key,
                               Name = g.Select(x => x.p.Name).First(),
                               UrlName = g.Select(x => x.p.UrlName).First(),
                               BrandId = g.Select(x => x.p.BrandId).First(),
                               CategoryId = g.Select(x => x.p.CategoryId).First(),
                               Gender = g.Select(x => x.p.Gender).First(),
                               IsChildren = g.Select(x => x.p.IsChildren).First(),
                               Image = g.Select(x => x.i.Image).First(),
                               Price = g.Select(x => x.d.Price).First(),
                               OldPrice = g.Select(x => x.d.OldPrice).First(),
                               Quantity = g.Sum(x => x.d.Quantity)
                           });

        return productList;
    }

    public IEnumerable<ProductReadDTO> GetAllProductsPriceDesc(string search)
    {

        var productList = (from p in GetDbContext().Products
                           join c in GetDbContext().ProductColors on p.Id equals c.ProductId
                           join i in GetDbContext().ProductImages on c.Id equals i.ProductColorId
                           join d in GetDbContext().ProductDetails on c.Id equals d.ProductColorId
                           where i.Image!.Contains("-1.") && (p.Name.ToLower().Contains(search))
                           group new { p, c, i, d } by p.Id into g
                           orderby g.Select(x => x.d.Price).FirstOrDefault() descending
                           select new ProductReadDTO
                           {
                               Id = g.Key,
                               Name = g.Select(x => x.p.Name).First(),
                               UrlName = g.Select(x => x.p.UrlName).First(),
                               BrandId = g.Select(x => x.p.BrandId).First(),
                               CategoryId = g.Select(x => x.p.CategoryId).First(),
                               Gender = g.Select(x => x.p.Gender).First(),
                               IsChildren = g.Select(x => x.p.IsChildren).First(),
                               Image = g.Select(x => x.i.Image).First(),
                               Price = g.Select(x => x.d.Price).First(),
                               OldPrice = g.Select(x => x.d.OldPrice).First(),
                               Quantity = g.Sum(x => x.d.Quantity)
                           });

        return productList;
    }

    public IEnumerable<ProductReadDTO> GetAllProductsNameAsc(string search)
    {

        var productList = (from p in GetDbContext().Products
                           join c in GetDbContext().ProductColors on p.Id equals c.ProductId
                           join i in GetDbContext().ProductImages on c.Id equals i.ProductColorId
                           join d in GetDbContext().ProductDetails on c.Id equals d.ProductColorId
                           where i.Image!.Contains("-1.") && (p.Name.ToLower().Contains(search))
                           group new { p, c, i, d } by p.Id into g
                           orderby g.Select(x => x.p.Name).FirstOrDefault()
                           select new ProductReadDTO
                           {
                               Id = g.Key,
                               Name = g.Select(x => x.p.Name).First(),
                               UrlName = g.Select(x => x.p.UrlName).First(),
                               BrandId = g.Select(x => x.p.BrandId).First(),
                               CategoryId = g.Select(x => x.p.CategoryId).First(),
                               Gender = g.Select(x => x.p.Gender).First(),
                               IsChildren = g.Select(x => x.p.IsChildren).First(),
                               Image = g.Select(x => x.i.Image).First(),
                               Price = g.Select(x => x.d.Price).First(),
                               OldPrice = g.Select(x => x.d.OldPrice).First(),
                               Quantity = g.Sum(x => x.d.Quantity)
                           });

        return productList;
    }

    public IEnumerable<ProductReadDTO> GetAllProductsNameDesc(string search)
    {

        var productList = (from p in GetDbContext().Products
                           join c in GetDbContext().ProductColors on p.Id equals c.ProductId
                           join i in GetDbContext().ProductImages on c.Id equals i.ProductColorId
                           join d in GetDbContext().ProductDetails on c.Id equals d.ProductColorId
                           where i.Image!.Contains("-1.") && (p.Name.ToLower().Contains(search))
                           group new { p, c, i, d } by p.Id into g
                           orderby g.Select(x => x.p.Name).FirstOrDefault() descending
                           select new ProductReadDTO
                           {
                               Id = g.Key,
                               Name = g.Select(x => x.p.Name).First(),
                               UrlName = g.Select(x => x.p.UrlName).First(),
                               BrandId = g.Select(x => x.p.BrandId).First(),
                               CategoryId = g.Select(x => x.p.CategoryId).First(),
                               Gender = g.Select(x => x.p.Gender).First(),
                               IsChildren = g.Select(x => x.p.IsChildren).First(),
                               Image = g.Select(x => x.i.Image).First(),
                               Price = g.Select(x => x.d.Price).First(),
                               OldPrice = g.Select(x => x.d.OldPrice).First(),
                               Quantity = g.Sum(x => x.d.Quantity)
                           });

        return productList;
    }
}
