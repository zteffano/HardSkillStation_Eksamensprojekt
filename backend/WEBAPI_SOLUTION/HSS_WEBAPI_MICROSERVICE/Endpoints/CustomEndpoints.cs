using HSS_WEBAPI_MICROSERVICE.Context;

namespace HSS_WEBAPI_MICROSERVICE.Endpoints
{
	public static class CustomEndpoints
	{
		public static void MapEventBriteEndpoints(this WebApplication app)
		{
			app.MapGet("/events", async (EventBriteApi eventBriteApi) =>
			{
				try
				{
					var events = await eventBriteApi.GetEventsAsync();
					return Results.Ok(events);
				}
				catch (Exception ex)
				{
					return Results.Problem("Internal server error: " + ex.Message);
				}
			}).WithTags("EventBrite API Filtered");
		}

	}
}
