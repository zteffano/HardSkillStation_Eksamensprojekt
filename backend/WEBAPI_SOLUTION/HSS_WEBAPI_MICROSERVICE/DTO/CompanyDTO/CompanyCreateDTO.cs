using HSS_WEBAPI_MICROSERVICE.Models;
using HSS_WEBAPI_MICROSERVICE.DTO.LocationDTO;
using System.ComponentModel.DataAnnotations;


namespace HSS_WEBAPI_MICROSERVICE.DTO.CompanyDTO
{
	public class CompanyCreateDTO
    {


        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        // Navigation property for Location
        public LocationCreateDTO Location { get; set; }

    }
}