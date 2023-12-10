﻿using HSS_WEBAPI_MICROSERVICE.Models;
using System.ComponentModel.DataAnnotations;

namespace HSS_WEBAPI_MICROSERVICE.DTO.AccountTypeDTO
{
	public class AccountTypeGetDTO
	{

		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(255)]
		public string Name { get; set; }

	}
}
