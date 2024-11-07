using AutoMapper;
using cartservices.Data;
using cartservices.DTO;
using cartservices.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var config = new MapperConfiguration(cfg => cfg.CreateMap<ProductReadDTO, Product>());
var mapper = config.CreateMapper();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddDbContext<AtWebContext>(opt => opt.UseMySQL(builder.Configuration.GetConnectionString("AtWebCon")));

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

app.Run();
