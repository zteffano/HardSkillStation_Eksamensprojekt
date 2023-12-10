using HSS_WEBAPI_MICROSERVICE.Models;
using System.ComponentModel.DataAnnotations;

public class Company
{
	[Key]
	public int Id { get; set; }

	[Required]
	[MaxLength(255)]
	public string Name { get; set; }

	// Foreign key for Location
	public int LocationId { get; set; }

	// Navigation property for Location
	public Location Location { get; set; }

	// Navigation property for Workshops
	public List<Workshop> Workshops { get; set; }
}