using HSS_WEBAPI_MICROSERVICE.Models;
using System.ComponentModel.DataAnnotations;

namespace HSS_WEBAPI_MICROSERVICE.DTO.CategoryDTO
{
    public class CategoryCreateDTO
    {
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
    }
}
