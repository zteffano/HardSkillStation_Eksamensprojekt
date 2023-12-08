using HSS_WEBAPI_MICROSERVICE.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HSS_WEBAPI_MICROSERVICE.DTO.AccountWorkshopDTO
{
	public class AccountWorkshopGetDTO
	{
	
			[Key, Column(Order = 0)]
			[ForeignKey("Account")]
			public int AccountId { get; set; }
		
			[Key, Column(Order = 1)]
			[ForeignKey("Workshop")]
			public int WorkshopId { get; set; }

			public bool Participated { get; set; }
		
	}
}
