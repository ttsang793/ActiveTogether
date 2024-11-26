using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Configuration;

public static class ConfigurationService
{
    public static void RegisterDb(this IServiceCollection service, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("AtWebCon") ?? throw new Exception("Mất kết nối...");
        service.AddDbContext<AtWebContext>(option => option.UseMySQL(connectionString));
    }

    public static void AutoMigration(this IServiceProvider service)
    {
        using var scope = service.CreateScope();
    }

    public static void AllowCors(this IServiceProvider service)
    {
    }
}