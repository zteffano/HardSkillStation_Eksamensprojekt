using HSS_WEBAPI_MICROSERVICE.Models;
using System.ComponentModel.DataAnnotations;

namespace HSS_WEBAPI_MICROSERVICE.DTO.CategoryDTO
{
    public class CategoryGetDTO
    {
		[Key]
		public int Id { get; set; }

		[Required]
        [MaxLength(255)]
        public string Name { get; set; }
    }
}
