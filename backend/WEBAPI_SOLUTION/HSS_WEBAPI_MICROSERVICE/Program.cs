using Microsoft.AspNetCore.Builder;
using System.Security.Cryptography.X509Certificates;
using HSS_WEBAPI_MICROSERVICE.Models;
using HSS_WEBAPI_MICROSERVICE.Context;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;
using Microsoft.Extensions.Configuration;
using AutoMapper;
using HSS_WEBAPI_MICROSERVICE.Endpoints;
using HSS_WEBAPI_MICROSERVICE.DTO.AccountDTO;
using HSS_WEBAPI_MICROSERVICE.DTO;


namespace HSS_WEBAPI_MICROSERVICE
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			// Add services to the container.
			builder.Services.AddAuthorization();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();
			
			// Connection string logic - til at skjule credentials i connectionstring og til brug af miljøvariabler
			string connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
			.Replace("(DB_SERVER)", Environment.GetEnvironmentVariable("DB_SERVER"))
			.Replace("(DB_USER)", Environment.GetEnvironmentVariable("DB_USER"))
			.Replace("(DB_PASSWORD)", Environment.GetEnvironmentVariable("DB_PASSWORD"))
			.Replace("(DB_DATABASENAME)", Environment.GetEnvironmentVariable("DB_DATABASENAME"));

			//Skal kommenteres ud, hvis der ikke testes på lokal database, ellers overrider den vores connectionstring logic.
			connectionString = builder.Configuration.GetConnectionString("TestConnection");

			builder.Services.AddDbContext<HSSContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

			// Auto mapper
			builder.Services.AddAutoMapper(typeof(MappingProfile));
			var app = builder.Build(); 

			// Vi tillader pt. Swagger at være aktiv i alle miljøer
	
			app.UseSwagger();
			app.UseSwaggerUI();


			app.UseHttpsRedirection();
			app.UseAuthorization();

			//Endpoints til Account
			app.MapAccountEndpoints();
			app.MapWorkshopEndpoints();
			app.MapLocationEndpoints();
			app.MapCompanyEndpoints();
			app.MapCategoryEndpoints();
			app.MapAccountTypeEndpoints();
			app.MapAccountWorkshopEndpoints();


			// '/login' : POST => user & password:
			app.MapLoginEndPoint();

			app.Run();
		}

	}


}