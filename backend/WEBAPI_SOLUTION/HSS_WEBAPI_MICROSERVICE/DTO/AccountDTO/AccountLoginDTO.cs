
using System.ComponentModel.DataAnnotations;

namespace HSS_WEBAPI_MICROSERVICE.DTO.AccountDTO
{
    public class AccountLoginDTO
    {

        [Required]
        [MaxLength(100)]
        public string Username { get; set; }

        [Required]
        [MaxLength(100)]
        public string Password { get; set; } // Skal laves om til en password hash senere hen

    }
}