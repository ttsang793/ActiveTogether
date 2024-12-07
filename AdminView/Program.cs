using Application.Interface;
using Application.Service;
using Core.Interface;
using Infrastructure.Repository;
using Infrastructure.Configuration;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.RegisterDb(builder.Configuration);
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAdminUserService, AdminUserService>();
builder.Services.AddScoped<IBlogService, BlogService>();
builder.Services.AddScoped<IBrandService, BrandService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IColorService, ColorService>();
builder.Services.AddScoped<IFirebaseAuthService, FirebaseAuthService>();
builder.Services.AddScoped<IImportService, ImportService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IPolicyService, PolicyService>();
builder.Services.AddScoped<IPermissionService, PermissionService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductColorService, ProductColorService>(); 
builder.Services.AddScoped<IProductDetailService, ProductDetailService>();
builder.Services.AddScoped<IPromotionService, PromotionService>();
builder.Services.AddScoped<IRefundService, RefundService>();
builder.Services.AddScoped<ISportService, SportService>();
builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(5);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseSession();

app.Run();
