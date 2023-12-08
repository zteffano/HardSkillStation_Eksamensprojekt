using System.ComponentModel.DataAnnotations;

namespace HSS_WEBAPI_MICROSERVICE.Models
{
	public class Location
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(255)]
		public string Name { get; set; }

		[MaxLength(255)]
		public string Address { get; set; }

		[MaxLength(255)]
		public string Website { get; set; }

		[MaxLength(100)]
		public string ContactEmail { get; set; }

		// Navigation property for Companies
		public List<Company> Companies { get; set; }

		// Navigation property for Workshops
		public List<Workshop> Workshops { get; set; }
	}
}
