using Core.Interface;
using Core.Entity;
using Infrastructure.Data;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Repository;
public class SportRepository : BaseRepository<Sport>, ISportRepository
{
    private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "..\\reactapp\\src\\Images\\sport");
    public SportRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public IEnumerable<Sport> GetAllSports(Expression<Func<Sport, bool>> expression = null)
    {
        if (expression == null) return GetDbSet().ToList();
        else return GetDbSet().Where(expression).ToList();
    }

    private Sport GetById(int id)
    {
        return GetDbSet().First(s => s.Id == id);
    }

    public void Insert(Sport sport)
    {
        sport.Id = GetDbSet().OrderByDescending(s => s.Id).First().Id + 1;
        sport.IsActive = true;
        GetDbSet().Add(sport);
    }

    public void Update(Sport sport)
    {
        sport.IsActive = true;
        GetDbSet().Update(sport);
    }

    public void Lock(int id)
    {
        var sport = GetById(id);
        sport.IsActive = false;
    }

    public void Unlock(int id)
    {
        var sport = GetById(id);
        sport.IsActive = true;
    }

    private async Task<bool> DeleteImage(string name)
    {
        try
        {
            string[] files = Directory.GetFiles(_uploadDirectory, name + ".*");
            if (files.Any())
            {
                foreach (string file in files) File.Delete(file);
                return true;
            }
            else return false;
        }
        catch
        {
            return false;
        }
    }

    public async Task<bool> UploadImage(IFormFile file, string name)
    {
        try
        {
            var fileName = name + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_uploadDirectory, fileName);

            await DeleteImage(name);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            return true;
        }
        catch
        {
            return false;
        }
    }
}