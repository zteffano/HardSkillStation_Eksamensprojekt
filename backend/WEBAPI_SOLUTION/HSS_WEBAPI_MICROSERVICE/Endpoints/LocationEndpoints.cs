using AutoMapper;
using HSS_WEBAPI_MICROSERVICE.Context;
using HSS_WEBAPI_MICROSERVICE.DTO.LocationDTO;
using HSS_WEBAPI_MICROSERVICE.Models;
using Microsoft.EntityFrameworkCore;

namespace HSS_WEBAPI_MICROSERVICE.Endpoints
{
	public static class LocationEndpoints
	{
		public static string swaggerHeading = "Location Endpoints";
		public static void MapLocationEndpoints(this WebApplication app)
		{
			app.MapGet("/locations", async (HSSContext context, IMapper mapper) =>
			{
				List<Location> location = await context.Locations.ToListAsync();
				List<LocationGetDTO> locationsDTO = mapper.Map<List<LocationGetDTO>>(location);

				return Results.Ok(locationsDTO);
			}).WithTags(swaggerHeading);

			app.MapGet("/location/{id}", async (HSSContext context, IMapper mapper, int id) =>
			{
				Location location = await context.Locations.FindAsync(id);
				if (location == null)
				{
					return Results.NotFound($"Location with ID {id} not found.");
				}

				LocationGetDTO locationDTO = mapper.Map<LocationGetDTO>(location);
				return Results.Ok(locationDTO);
			}).WithTags("Location Endpoints");



			app.MapPost("/createlocation", async (LocationCreateDTO locationDTO, HSSContext context, IMapper mapper) =>
			{
				Location location = mapper.Map<Location>(locationDTO);
				context.Locations.Add(location);
				await context.SaveChangesAsync();

				return Results.Created($"/location/{location.Id}", location);

			}).WithTags(swaggerHeading);



			/* OBS der skal evt. også slettes i account_workshop ved samme lejlighed - skal vi have kigget på */
			app.MapDelete("/deletelocation/{id}", async (HSSContext context, int id) =>
			{
				Location location = await context.Locations.FindAsync(id);

				if (location == null)
				{
					return Results.NotFound($"Location med {id} blev ikke fundet");
				}

				context.Locations.Remove(location);
				await context.SaveChangesAsync();

				return Results.Ok($"Location med id: {id} er nu slettet");

			}).WithTags(swaggerHeading);
		}
	}
}
