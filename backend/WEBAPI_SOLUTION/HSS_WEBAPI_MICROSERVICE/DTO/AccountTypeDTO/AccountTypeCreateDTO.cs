using System.ComponentModel.DataAnnotations;

namespace HSS_WEBAPI_MICROSERVICE.DTO.AccountTypeDTO
{
	public class AccountTypeCreateDTO
	{

		[Required]
		[MaxLength(255)]
		public string Name { get; set; }
	}
}
