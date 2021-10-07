using Modals.DataModels;
using Modals.DataViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Interfaces
{
    public interface ICategoryService
    {
        public bool AddCategory(Category category);
        public CategoryDetailsView GetCategoryById(int categoryId);
        public List<Category> GetCategories();
        public List<CategoryDetailsView> GetCategoriesDetails();
    }
}
