using System.ComponentModel.DataAnnotations;

namespace HSS_WEBAPI_MICROSERVICE.DTO.WorkshopDTO
{
	public class WorkshopFormattedGetDTO
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[StringLength(250)]
		public string Name { get; set; }

		public DateTime Created { get; set; }
		public DateTime Start { get; set; }
		public DateTime End { get; set; }

		[DataType(DataType.MultilineText)]
		public string Description { get; set; }

		[DataType(DataType.MultilineText)]
		public string Summary { get; set; }

		[StringLength(510)]
		public string Logo { get; set; }

		public int MicroCredentials { get; set; }

		[StringLength(510)]
		public string TicketLink { get; set; }

		[StringLength(510)]
		public string WorkshopLink { get; set; }

		[StringLength(255)]
		public string Status { get; set; }

		// Foreign keys og navigation properties til kategorier, lokationer og virksomheder
		public int CategoryId { get; set; }

		public int LocationId { get; set; }

		public int CompanyId { get; set; }

		// Properties for Category
		public string CategoryName { get; set; }

		// Properties for Location
		public string LocationAddress { get; set; }
		public string LocationWebsite { get; set; }
		public string LocationContactEmail { get; set; }

		// Properties for Company
		public string CompanyName { get; set; }
	}
}
