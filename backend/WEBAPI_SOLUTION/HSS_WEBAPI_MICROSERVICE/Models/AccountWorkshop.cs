using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HSS_WEBAPI_MICROSERVICE.Models
{

	public class AccountWorkshop
	{
		[Key, Column(Order = 0)]
		[ForeignKey("Account")]
		public int AccountId { get; set; }
		public Account Account { get; set; }

		[Key, Column(Order = 1)]
		[ForeignKey("Workshop")]
		public int WorkshopId { get; set; }
		public Workshop Workshop { get; set; }

		public bool Participated { get; set; }

		//Constructor der automatisk sætter Participated til false, som default.
		public AccountWorkshop()
		{
			Participated = false;
		}
	}
}
