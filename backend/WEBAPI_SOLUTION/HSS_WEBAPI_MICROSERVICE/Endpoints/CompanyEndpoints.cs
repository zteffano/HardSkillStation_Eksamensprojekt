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
            app.MapGet("/companies", async (HSSContext context, IMapper mapper) =>
            {
                List<Company> companies = await context.Companies.ToListAsync();
                List<CompanyGetDTO> companyDTOs = mapper.Map<List<CompanyGetDTO>>(companies);

                return Results.Ok(companyDTOs);
            }).WithTags("Company Endpoints");

			app.MapGet("/company/{id}", async (HSSContext context, IMapper mapper, int id) =>
			{
				Company company = await context.Companies.FindAsync(id);
				if (company == null)
				{
					return Results.NotFound($"Company with ID {id} not found.");
				}

				CompanyGetDTO companyDTO = mapper.Map<CompanyGetDTO>(company);
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
