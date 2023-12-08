using AutoMapper;
using HSS_WEBAPI_MICROSERVICE.Context;
using HSS_WEBAPI_MICROSERVICE.DTO.CategoryDTO;
using HSS_WEBAPI_MICROSERVICE.Models;
using Microsoft.EntityFrameworkCore;

namespace HSS_WEBAPI_MICROSERVICE.Endpoints
{
    public static class CategoryEndpoints
    {
        public static void MapCategoryEndpoints(this WebApplication app)
        {
            app.MapGet("/categories", async (HSSContext context, IMapper mapper) =>
            {
                List<Category> categories = await context.Categories.ToListAsync();
                List<CategoryGetDTO> categoryDTOs = mapper.Map<List<CategoryGetDTO>>(categories);

                return Results.Ok(categoryDTOs);
            }).WithTags("Category Endpoints");

            // Opret en Category
            app.MapPost("/createcategory", async (CategoryCreateDTO categoryCreateDTO, HSSContext context, IMapper mapper) =>
            {
                Category category = mapper.Map<Category>(categoryCreateDTO);
                context.Categories.Add(category);
                await context.SaveChangesAsync();
                CategoryGetDTO categoryGetDto = mapper.Map<CategoryGetDTO>(category);

                return Results.Created($"/category/{category.Id})", categoryGetDto);

            }).WithTags("Category Endpoints");


            // Find category med specifik ID
            app.MapGet("/category/{id}", async (HSSContext context, int id, IMapper mapper) =>
            {
                Category category = await context.Categories.FindAsync(id);

                if (category == null)
                {
                    return Results.NotFound($"Category med {id} blev ikke fundet");
                }

                CategoryGetDTO categoryGetDTO = mapper.Map<CategoryGetDTO>(category);

                return Results.Ok(categoryGetDTO);

            }).WithTags("Category Endpoints");

            /* Opdater en Category'
            app.MapPut("/updatecategory/{id}", async (CategoryCreateDTO updatedcategoryDTO, HSSContext context, int id, IMapper mapper) =>
            {
                Category category = await context.Categories.FindAsync(id);

                if (category == null)
                {
                    Return.NotFound($"Cateogry med {id} blev ikke fundet");

                }

                mapper.Map(updatedCategoryDTO, category);
                await context.SaveChangesAsync();
            }

            */

            // Slet en bestemt Category
            app.MapDelete("/deletecategory/{id}", async (HSSContext context, int id) =>
            {
                Category category = await context.Categories.FindAsync(id);

                if (category == null)
                {
                    return Results.NotFound($"Category med {id} blev ikke fundet");
                }

                context.Categories.Remove(category);
                await context.SaveChangesAsync();

                return Results.Ok($"Category med id:{id} is now deleted");

            }).WithTags("Category Endpoints");
        }

    }
}