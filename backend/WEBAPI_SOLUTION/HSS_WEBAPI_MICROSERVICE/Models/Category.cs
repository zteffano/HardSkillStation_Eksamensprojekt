using System.ComponentModel.DataAnnotations;

namespace HSS_WEBAPI_MICROSERVICE.Models
{
	public class Category
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(255)]
		public string Name { get; set; }

		// Navigation property for Workshops
		public List<Workshop> Workshops { get; set; }
	}
}
