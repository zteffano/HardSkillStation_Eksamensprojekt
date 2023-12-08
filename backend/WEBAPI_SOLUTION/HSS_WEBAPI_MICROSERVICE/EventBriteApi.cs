using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml.Linq;
using Newtonsoft.Json;

namespace HSS_WEBAPI_MICROSERVICE
{
	public class EventBriteApi
	{
		private readonly string baseUrl = "https://www.eventbrite.com/api/v3/";
		private readonly HttpClient httpClient;

		public EventBriteApi()
		{
			httpClient = new HttpClient();
		}

		public async Task<ApiResponse> GetEventsAsync()
		{
			string endpoint = "collections/1144319/events/public/?time_filter=past&page=1&page_size=50&order_by=start_desc";
			HttpResponseMessage response = await httpClient.GetAsync(baseUrl + endpoint);

			if (response.IsSuccessStatusCode)
			{
				string content = await response.Content.ReadAsStringAsync();
				return JsonConvert.DeserializeObject<ApiResponse>(content);
			}

			throw new Exception("Unable to retrieve events: " + response.StatusCode);
		}

		// Her kommer resten af dine klasser fra det tidligere eksempel
		public class ApiResponse
		{
			[JsonProperty("events")]
			public Event[] Events { get; set; }
		}

		public class Event
		{
			[JsonProperty("name")]
			public Name Name { get; set; }

			[JsonProperty("created")]
			public DateTime Created { get; set; }

			[JsonProperty("start")]
			public StartEnd Start { get; set; }

			[JsonProperty("end")]
			public StartEnd End { get; set; }

			[JsonProperty("description")]
			public Description Description { get; set; }

			[JsonProperty("logo")]
			public Logo Logo { get; set; }

			[JsonProperty("published")]
			public DateTime Published { get; set; }

			[JsonProperty("resource_uri")]
			public string ResourceUri { get; set; }

			[JsonProperty("status")]
			public string Status { get; set; }

			[JsonProperty("summary")]
			public string Summary { get; set; }

			[JsonProperty("url")]
			public string Url { get; set; }

			[JsonProperty("venue_id")]
			public string VenueId { get; set; }
		}


	}

	public class Name
	{
		[JsonProperty("text")]
		public string Text { get; set; }
	}

	public class StartEnd
	{
		[JsonProperty("local")]
		public DateTime Local { get; set; }
	}

	public class Description
	{
		[JsonProperty("text")]
		public string Text { get; set; }
	}

	public class Logo
	{
		[JsonProperty("url")]
		public string Url { get; set; }
	}
	/*
	public class Program
	{
		public static async Task Main(string[] args)
		{
			var api = new EventBriteApi();
			var events = await api.GetEventsAsync();

			foreach (var eventItem in events.Events)
			{
				Console.WriteLine("Name: " + eventItem.Name.Text);
				// Udskriv resten af informationerne...
			}
		}
	}
	*/
}
