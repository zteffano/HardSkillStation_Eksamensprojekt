using HSS_WEBAPI_MICROSERVICE.Models;
using System.ComponentModel.DataAnnotations;

namespace HSS_WEBAPI_MICROSERVICE.DTO.LocationDTO
{
	public class LocationCreateDTO
	{

		[Required]
		[MaxLength(255)]
		public string Name { get; set; }

		[MaxLength(255)]
		public string Address { get; set; }

		[MaxLength(255)]
		public string Website { get; set; }

		[MaxLength(100)]
		public string ContactEmail { get; set; }

	}
}
