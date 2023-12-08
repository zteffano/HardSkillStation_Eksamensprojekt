using AutoMapper;
using HSS_WEBAPI_MICROSERVICE.Context;
using HSS_WEBAPI_MICROSERVICE.DTO.AccountDTO;
using HSS_WEBAPI_MICROSERVICE.Models;
using Microsoft.EntityFrameworkCore;

namespace HSS_WEBAPI_MICROSERVICE.Endpoints
{
	public static class AccountEndspoints
	{
		public static void MapAccountEndpoints(this WebApplication app)
		{
			app.MapGet("/accounts", async (HSSContext context, IMapper mapper) =>
			{
				List<Account> accounts = await context.Accounts.ToListAsync();
				List<AccountGetDTO> accountDTOs = mapper.Map<List<AccountGetDTO>>(accounts);

				return Results.Ok(accountDTOs);
			}).WithTags("Account Endpoints");

			app.MapGet("/account/{id}", async (HSSContext context, IMapper mapper, int id) =>
			{
				Account account = await context.Accounts.FindAsync(id);
				if (account == null)
				{
					return Results.NotFound($"Account med ID {id} blev ikke fundet.");
				}

				AccountGetDTO accountDTO = mapper.Map<AccountGetDTO>(account);
				return Results.Ok(accountDTO);
			}).WithTags("Account Endpoints");



			app.MapPost("/createaccount", async (AccountCreateDTO accountDTO, HSSContext context, IMapper mapper) =>
			{
				Account account = mapper.Map<Account>(accountDTO);
				context.Accounts.Add(account);
				await context.SaveChangesAsync();
				AccountGetDTO accountGetDTO = mapper.Map<AccountGetDTO>(account);

				return Results.Created($"/account/{account.Id}", accountGetDTO);

			}).WithTags("Account Endpoints");

			app.MapDelete("/deleteaccount/{id}", async (HSSContext context, int id) =>
			{
				Account account = await context.Accounts.FindAsync(id);

				if (account == null)
				{
					return Results.NotFound($"Bruger med {id} blev ikke fundet");
				}

				context.Accounts.Remove(account);
				await context.SaveChangesAsync();

				return Results.Ok($"Brugeren med id: {id} er nu slettet");

			}).WithTags("Account Endpoints");
		}

		public static void MapLoginEndPoint(this WebApplication app)
		{
			//Login Endpoint logic
			// '/login' : POST => user & password:
			app.MapPost("/login", async (AccountLoginDTO accountLoginDTO, HSSContext context) =>
			{

				List<Account> accounts = await context.Accounts.ToListAsync();
			
				foreach (Account account in accounts)
				{

					if (account.Username == accountLoginDTO.Username)
					{
						if (account.Password == accountLoginDTO.Password)
						{
							return Results.Ok("Fint");
						}
					}
				}
				
				
				return Results.NotFound("Fandt ikke brugeren");
			});
		}
	}
}
