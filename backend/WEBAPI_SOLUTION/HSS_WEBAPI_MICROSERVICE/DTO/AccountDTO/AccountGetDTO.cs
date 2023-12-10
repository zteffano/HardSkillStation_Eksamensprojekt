using System.ComponentModel.DataAnnotations;

namespace HSS_WEBAPI_MICROSERVICE.DTO.AccountDTO
{
	public class AccountGetDTO
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(100)]
		public string Username { get; set; }

		[Required]
		[MaxLength(100)]
		public string Password { get; set; } // Skal laves om til en password hash senere hen

		[Required]
		[MaxLength(100)]
		public string Email { get; set; }

        // Foreign key til AccountType
        public int AccountTypeId { get; set; }
    }
}