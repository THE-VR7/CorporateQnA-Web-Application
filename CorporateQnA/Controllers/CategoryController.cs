using Microsoft.AspNetCore.Mvc;
using Modals.DataModels;
using Modals.DataViewModels;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CorporateQnA.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : Controller
    {
        
        public readonly ICategoryService CategoryService;
        public CategoryController(ICategoryService service)
        {
            this.CategoryService = service;
        }

        [Route("GetCategories")]
        public List<Category> GetCategories()
        {
            return this.CategoryService.GetCategories();
        }

        [Route("GetCategoriesDetails")]
        public List<CategoryDetailsView> GetCategoriesDetails()
        {
            return this.CategoryService.GetCategoriesDetails();
        }


        [Route("addCategory")]
        public bool Post([FromBody]Category category)
        {
            return CategoryService.AddCategory(category);
        }

    }
}
