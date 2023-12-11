using AutoMapper;
using HSS_WEBAPI_MICROSERVICE.Context;
using HSS_WEBAPI_MICROSERVICE.DTO.CompanyDTO;
using HSS_WEBAPI_MICROSERVICE.Models;
using Microsoft.EntityFrameworkCore;

namespace HSS_WEBAPI_MICROSERVICE.Endpoints
{
    public static class CompanyEndpoints
    {
        public static void MapCompanyEndpoints(this WebApplication app)
        {
			app.MapGet("/companies", async (HSSContext context) =>
			{
				// Inkluderer Location data, når vi henter Companies. Midlertidig løsning. Senere merger vi dem og fjerner location helt
				List<Company> companies = await context.Companies
													   .Include(c => c.Location)
													   .ToListAsync();

				// Mapper Companies til CompanyGetDTO, inklusive de nye Location data
				List<CompanyGetDTO> companyDTOs = companies.Select(c => new CompanyGetDTO
				{
					Id = c.Id,
					Name = c.Name,
					LocationId = c.LocationId,
					Address = c.Location?.Address,
					Website = c.Location?.Website,
					ContactEmail = c.Location?.ContactEmail
				}).ToList();

				return Results.Ok(companyDTOs);
			}).WithTags("Company Endpoints");


			app.MapGet("/company/{id}", async (HSSContext context, int id) =>
			{
				// Inkluderer Location data, når du henter den specifikke Company
				Company company = await context.Companies
											   .Include(c => c.Location)
											   .FirstOrDefaultAsync(c => c.Id == id);

				if (company == null)
				{
					return Results.NotFound($"Company with ID {id} not found.");
				}

				// Mapper Company til CompanyGetDTO
				CompanyGetDTO companyDTO = new CompanyGetDTO
				{
					Id = company.Id,
					Name = company.Name,
					LocationId = company.LocationId,
					Address = company.Location?.Address,
					Website = company.Location?.Website,
					ContactEmail = company.Location?.ContactEmail
				};

				return Results.Ok(companyDTO);
			}).WithTags("Company Endpoints");



			app.MapPost("/createcompany", async (CompanyCreateDTO companyDTO, HSSContext context, IMapper mapper) =>
            {
                Company company = mapper.Map<Company>(companyDTO);
                context.Companies.Add(company);
                await context.SaveChangesAsync();
                CompanyGetDTO companyGetDTO = mapper.Map<CompanyGetDTO>(company);

                return Results.Created($"/company/{company.Id}", companyGetDTO);

            }).WithTags("Company Endpoints");

            app.MapDelete("/deletecompany/{id}", async (HSSContext context, int id) =>
            {
                Company company = await context.Companies.FindAsync(id);

                if (company == null)
                {
                    return Results.NotFound($"Company med {id} blev ikke fundet");
                }

                context.Companies.Remove(company);
                await context.SaveChangesAsync();

                return Results.Ok($"Company med id: {id} er nu slettet");

            }).WithTags("Company Endpoints");
        }
    }
}
