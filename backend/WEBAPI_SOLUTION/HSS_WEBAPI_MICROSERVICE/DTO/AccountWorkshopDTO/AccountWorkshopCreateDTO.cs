
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HSS_WEBAPI_MICROSERVICE.DTO.AccountWorkshopDTO
{
	public class AccountWorkshopCreateDTO
	{
		[Key, Column(Order = 0)]
		[ForeignKey("Account")]
		[Required]
		public int AccountId { get; set; }
	

		[Key, Column(Order = 1)]
		[ForeignKey("Workshop")]
		[Required]
		public int WorkshopId { get; set; }

	}
}
