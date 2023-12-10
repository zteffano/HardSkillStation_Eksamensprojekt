using System.ComponentModel.DataAnnotations;

namespace HSS_WEBAPI_MICROSERVICE.Models
{
    public class AccountType
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        // Navigation property til Accounts
        public List<Account> Accounts { get; set; }
    }
}
