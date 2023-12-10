using AutoMapper;
using HSS_WEBAPI_MICROSERVICE.Context;

using HSS_WEBAPI_MICROSERVICE.Models;
using Microsoft.EntityFrameworkCore;
using HSS_WEBAPI_MICROSERVICE.DTO.WorkshopDTO;

namespace HSS_WEBAPI_MICROSERVICE.Endpoints
{
	public static class WorkshopEndpoints
	{
		public static string swaggerHeading = "Workshop Endpoints";
		public static void MapWorkshopEndpoints(this WebApplication app)
		{
			app.MapGet("/workshops", async (HSSContext context, IMapper mapper) =>
			{
				List<Workshop> workshop = await context.Workshops.ToListAsync();
				List<WorkshopGetDTO> workshopsDTOs = mapper.Map<List<WorkshopGetDTO>>(workshop);

				return Results.Ok(workshopsDTOs);
			}).WithTags(swaggerHeading);

			app.MapGet("/workshopsjoined", async (HSSContext context) =>
			{
				var query = from workshop in context.Workshops
							join category in context.Categories on workshop.CategoryId equals category.Id
							join location in context.Locations on workshop.LocationId equals location.Id
							join company in context.Companies on workshop.CompanyId equals company.Id
							select new WorkshopFormattedGetDTO
							{
								// Map existing Workshop properties
								Id = workshop.Id,
								Name = workshop.Name,
								Created = workshop.Created,
								Start = workshop.Start,
								End = workshop.End,
								Description = workshop.Description,
								Summary = workshop.Summary,
								Logo = workshop.Logo,
								MicroCredentials = workshop.MicroCredentials,
								TicketLink = workshop.TicketLink,
								WorkshopLink = workshop.WorkshopLink,
								Status = workshop.Status,
								CategoryId = workshop.CategoryId,
								LocationId = workshop.LocationId,
								CompanyId = workshop.CompanyId,

								// Map Category, Location, and Company properties
								CategoryName = category.Name,
								LocationAddress = location.Address,
								LocationWebsite = location.Website,
								LocationContactEmail = location.ContactEmail,
								CompanyName = company.Name
							};

				var workshopsDTOs = await query.ToListAsync();
				return Results.Ok(workshopsDTOs);
			}).WithTags(swaggerHeading);

			app.MapGet("/workshop/{id}", async (HSSContext context, IMapper mapper, int id) =>
			{
				Workshop workshop = await context.Workshops.FindAsync(id);
				if (workshop == null)
				{
					return Results.NotFound($"Workshop with ID {id} not found.");
				}

				WorkshopGetDTO workshopDTO = mapper.Map<WorkshopGetDTO>(workshop);
				return Results.Ok(workshopDTO);
			}).WithTags(swaggerHeading);



			app.MapPost("/createworkshop", async (WorkshopCreateDTO workshopDTO, HSSContext context, IMapper mapper) =>
			{
				Workshop workshop = mapper.Map<Workshop>(workshopDTO);
				context.Workshops.Add(workshop);
				await context.SaveChangesAsync();

				return Results.Created($"/workshop/{workshop.Id}", workshop);

			}).WithTags(swaggerHeading);

			

			/* OBS der skal evt. også slettes i account_workshop ved samme lejlighed - skal vi have kigget på */
			app.MapDelete("/deleteworkshop/{id}", async (HSSContext context, int id) =>
			{
				Workshop workshop = await context.Workshops.FindAsync(id);

				if (workshop == null)
				{
					return Results.NotFound($"Workshop med {id} blev ikke fundet");
				}

				context.Workshops.Remove(workshop);
				await context.SaveChangesAsync();

				return Results.Ok($"Workshop med id: {id} er nu slettet");

			}).WithTags(swaggerHeading);
		}
	}
}
