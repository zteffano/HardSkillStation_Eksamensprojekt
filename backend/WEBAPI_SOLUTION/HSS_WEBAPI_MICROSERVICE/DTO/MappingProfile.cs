using AutoMapper;
using HSS_WEBAPI_MICROSERVICE.Models;
using HSS_WEBAPI_MICROSERVICE.DTO.AccountDTO;
using HSS_WEBAPI_MICROSERVICE.DTO.WorkshopDTO;
using HSS_WEBAPI_MICROSERVICE.DTO.CategoryDTO;
using HSS_WEBAPI_MICROSERVICE.DTO.LocationDTO;
using HSS_WEBAPI_MICROSERVICE.DTO.CompanyDTO;
using HSS_WEBAPI_MICROSERVICE.DTO.AccountTypeDTO;
using HSS_WEBAPI_MICROSERVICE.DTO.AccountWorkshopDTO;

namespace HSS_WEBAPI_MICROSERVICE.DTO
{
	public class MappingProfile : Profile
	{
		public MappingProfile() 
		{

			// Account DTO mappings
			CreateMap<Account, AccountGetDTO>();
			CreateMap<AccountGetDTO, Account>();
			CreateMap<Account, AccountCreateDTO>();
			CreateMap<AccountCreateDTO, Account>();

			//Workshop DTO Mappings
			CreateMap<Workshop, WorkshopGetDTO>();
			CreateMap<WorkshopGetDTO, Workshop>();
			CreateMap<Workshop, WorkshopCreateDTO>();
			CreateMap<WorkshopCreateDTO, Workshop>();
			CreateMap<WorkshopFormattedGetDTO, Workshop>();
			CreateMap<Workshop, WorkshopFormattedGetDTO>();

			// Company DTO Mapping
			CreateMap<Company, CompanyCreateDTO>();
			CreateMap<CompanyCreateDTO, Company>();
			CreateMap<Company, CompanyGetDTO>();
			CreateMap<CompanyGetDTO, Company>();

			// Cateory DTO Mapping
			CreateMap<Category, CategoryCreateDTO>();
			CreateMap<CategoryCreateDTO, Category>();
			CreateMap<CategoryGetDTO, Category>();
			CreateMap<Category, CategoryGetDTO>();


			//Location DTO Mapping
			CreateMap<Location, LocationGetDTO>();
			CreateMap<LocationGetDTO, Location>();
			CreateMap<Location, LocationCreateDTO>();
			CreateMap<LocationCreateDTO, Location>();

			// AccountType
			CreateMap<AccountTypeCreateDTO, AccountType>();
			CreateMap<AccountType, AccountTypeCreateDTO>();
			CreateMap<AccountTypeGetDTO, AccountType>();
			CreateMap<AccountType, AccountTypeGetDTO>();

			//AccountWorkshop
			CreateMap<AccountWorkshop, AccountWorkshopCreateDTO>();
			CreateMap<AccountWorkshopCreateDTO, AccountWorkshop>();
			CreateMap<AccountWorkshop, AccountWorkshopGetDTO>();
			CreateMap<AccountWorkshopGetDTO, AccountWorkshop>();

			//login
			CreateMap<AccountLoginDTO, Account>();
			CreateMap<Account, AccountLoginDTO>();
		}
	}
}