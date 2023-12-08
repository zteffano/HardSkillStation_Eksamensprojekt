using AutoMapper;
using HSS_WEBAPI_MICROSERVICE.Context;
using HSS_WEBAPI_MICROSERVICE.DTO.AccountTypeDTO;
using HSS_WEBAPI_MICROSERVICE.Models;
using Microsoft.EntityFrameworkCore;

namespace HSS_WEBAPI_MICROSERVICE.Endpoints
{
    public static class AccountTypeEndpoints
    {
        public static void MapAccountTypeEndpoints(this WebApplication app)
        {
            app.MapGet("/accounttypes", async (HSSContext context, IMapper mapper) =>
            {
                List<AccountType> accountTypes = await context.AccountTypes.ToListAsync();
                List<AccountTypeGetDTO> accountTypesGetDTO = mapper.Map<List<AccountTypeGetDTO>>(accountTypes);

                return Results.Ok(accountTypesGetDTO);
            }).WithTags("Accounttype endpoints");



			app.MapGet("/accounttype/{id}", async (HSSContext context, IMapper mapper, int id) =>
			{
				AccountType accountType = await context.AccountTypes.FindAsync(id);
				if (accountType == null)
				{
					return Results.NotFound($"AccountType med ID {id} blev ikke fundet.");
				}

				AccountTypeGetDTO accountTypeDTO = mapper.Map<AccountTypeGetDTO>(accountType);
				return Results.Ok(accountTypeDTO);
			}).WithTags("Accounttype endpoints");


			app.MapPost("/createaccounttype", async (AccountTypeCreateDTO accounttypeDTO, HSSContext context, IMapper mapper) =>
                {
                    AccountType accountType = mapper.Map<AccountType>(accounttypeDTO);
                    context.AccountTypes.Add(accountType);
                    await context.SaveChangesAsync();

                    return Results.Created($"/accounttype/{accountType.Id}", accountType);
                }).WithTags("Accounttype endpoints");

            app.MapDelete("/deleteaccounttype/{id}", async (HSSContext context, int id) =>
            {
                AccountType accounttype = await context.AccountTypes.FindAsync(id);

                if (accounttype == null)
                {
                    return Results.NotFound($"Accounttype med {id} blev ikke fundet");
                }

                context.AccountTypes.Remove(accounttype);
                await context.SaveChangesAsync();
                return Results.Ok($"Accounttypen med {id} er nu slettet");
            }).WithTags("Accounttype endpoints");
        }
    }
}