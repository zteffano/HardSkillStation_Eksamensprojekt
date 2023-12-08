using HSS_WEBAPI_MICROSERVICE.Models;
using System.ComponentModel.DataAnnotations;


namespace HSS_WEBAPI_MICROSERVICE.DTO.CompanyDTO
{
    public class CompanyGetDTO
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        // Foreign key for Location
        public int LocationId { get; set; }

    }
}