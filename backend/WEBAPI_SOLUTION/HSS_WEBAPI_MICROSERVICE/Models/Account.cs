using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HSS_WEBAPI_MICROSERVICE.Models
{
    public class Account
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

        // Navigation property til AccountType
        public AccountType AccountType { get; set; }

        // Navigation property til relationstabellen
        public List<AccountWorkshop> AccountWorkshops { get; set; }
    }
}