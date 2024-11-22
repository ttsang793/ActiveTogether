using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository;
public class CartRepository : BaseRepository<CartDetail>, ICartRepository
{
    public CartRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<CartDetailReadDTO>> GetCartByUsername(string username)
    {
        var cart = await (from cd in GetDbSet()
                    join pd in GetDbContext().ProductDetails on cd.Sku equals pd.Sku
                    join pi in GetDbContext().ProductImages on pd.ProductColorId equals pi.ProductColorId
                    join pc in GetDbContext().ProductColors on pi.ProductColorId equals pc.Id
                    join c in GetDbContext().Colors on pc.ColorCode equals c.Code
                    join p in GetDbContext().Products on pc.ProductId equals p.Id
                    join u in GetDbContext().Users on cd.UserId equals u.Id
                    where u.Username == username
                    group new { cd, pd, pi, c, p, u } by cd.Sku into g
                    select new CartDetailReadDTO
                    {
                        Sku = g.Select(x => x.cd.Sku).First(),
                        Username = g.Select(x => x.u.Username).First(),
                        Name = g.Select(x => x.p.Name).First(),
                        Price = g.Select(x => x.cd.Price).First(),
                        Quantity = g.Select(x => x.cd.Quantity).First(),
                        Color = g.Select(x => x.c.Name).First(),
                        Size = g.Select(x => x.pd.Size).First(),
                        Image = g.Select(x => x.pi.Image).First()!

                    }).ToListAsync();
        return cart!;
    }

    public void Add(CartDetail cd)
    {
        var cartDetail = GetDbSet().FirstOrDefault(cart => cart.UserId == cd.UserId && cart.Sku == cd.Sku);
        if (cartDetail != null) cartDetail.Quantity += cd.Quantity;
        else GetDbSet().Add(cd);
    }

    public void Update(CartDetail cd)
    {
        var cartDetail = GetDbSet().FirstOrDefault(cart => cart.UserId == cd.UserId && cart.Sku == cd.Sku);
        if (cartDetail != null) cartDetail.Quantity = cd.Quantity;
    }

    public void Delete(int userId, string sku)
    {
        var cartDetail = GetDbSet().FirstOrDefault(c => c.UserId == userId && c.Sku == sku);
        if (cartDetail != null) GetDbSet().Remove(cartDetail);
    }

    public void DeleteAll(int userId)
    {
        var cartList = GetDbSet().Where(cd => cd.UserId == userId);
        if (cartList.Any()) GetDbContext().RemoveRange(cartList);
    }
}
