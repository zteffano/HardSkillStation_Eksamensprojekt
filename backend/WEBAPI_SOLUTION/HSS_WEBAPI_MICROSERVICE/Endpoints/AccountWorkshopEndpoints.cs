using AutoMapper;
using HSS_WEBAPI_MICROSERVICE.Context;
using HSS_WEBAPI_MICROSERVICE.Models;
using Microsoft.EntityFrameworkCore;
using HSS_WEBAPI_MICROSERVICE.DTO.AccountWorkshopDTO;

namespace HSS_WEBAPI_MICROSERVICE.Endpoints
{
	public static class AccountWorkshopEndpoints
	{
		public static void MapAccountWorkshopEndpoints(this WebApplication app)
		{
			app.MapGet("/accountworkshops", async (HSSContext context, IMapper mapper) =>
			{
				List<AccountWorkshop> accountworkshops = await context.AccountWorkshops.ToListAsync();
				List<AccountWorkshopGetDTO> accountworkshopsGetDTO = mapper.Map<List<AccountWorkshopGetDTO>>(accountworkshops);

				return Results.Ok(accountworkshopsGetDTO);
			}).WithTags("Account Workshops Endpoints");

			app.MapGet("/accountworkshop/{accountId}/{workshopId}", async (HSSContext context, int accountId, int workshopId, IMapper mapper) =>
			{
				AccountWorkshop accountWorkshop = await context.AccountWorkshops
					.Where(aw => aw.AccountId == accountId && aw.WorkshopId == workshopId)
					.FirstOrDefaultAsync();

				if (accountWorkshop == null)
				{
					return Results.NotFound($"AccountWorkshop med AccountID {accountId} og WorkshopID {workshopId} blev ikke fundet");
				}
				AccountWorkshopGetDTO accountWorkshopGetDTO = mapper.Map<AccountWorkshopGetDTO>(accountWorkshop);

				return Results.Ok(accountWorkshopGetDTO);
			}).WithTags("Account Workshops Endpoints");	



			app.MapPost("/createaccountworkshop", async (HSSContext context, IMapper mapper, AccountWorkshopCreateDTO accountWorkshopDTO) =>
			{
				AccountWorkshop newAccountWorkshop = mapper.Map<AccountWorkshop>(accountWorkshopDTO);
				context.AccountWorkshops.Add(newAccountWorkshop);
				await context.SaveChangesAsync();

				

				return Results.Created($"/accountworkshop/{newAccountWorkshop.AccountId}/{newAccountWorkshop.WorkshopId}", accountWorkshopDTO);
			}).WithTags("Account Workshops Endpoints");


			app.MapDelete("/deleteaccountworkshop/{accountId}/{workshopId}", async (HSSContext context, int accountId, int workshopId) =>
			{
				var accountWorkshop = await context.AccountWorkshops
					.Where(aw => aw.AccountId == accountId && aw.WorkshopId == workshopId)
					.FirstOrDefaultAsync();

				if (accountWorkshop == null)
				{
					return Results.NotFound($"AccountWorkshop with AccountID {accountId} and WorkshopID {workshopId} not found.");
				}

				context.AccountWorkshops.Remove(accountWorkshop);
				await context.SaveChangesAsync();

				return Results.NoContent();
			}).WithTags("Account Workshops Endpoints");


			app.MapPut("/accountworkshop/{accountId}/{workshopId}/participated", async (HSSContext context, int accountId, int workshopId) =>
			{
				var accountWorkshop = await context.AccountWorkshops
					.Where(aw => aw.AccountId == accountId && aw.WorkshopId == workshopId)
					.FirstOrDefaultAsync();

				if (accountWorkshop == null)
				{
					return Results.NotFound($"AccountWorkshop with AccountID {accountId} and WorkshopID {workshopId} not found.");
				}

				// Sætter Participated til true
				accountWorkshop.Participated = true;
				await context.SaveChangesAsync();

				return Results.Ok($"Participation status updated for AccountID {accountId} and WorkshopID {workshopId}");
			}).WithTags("Account Workshops Endpoints");










		}
	}
}

