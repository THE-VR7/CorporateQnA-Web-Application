using Modals.DataModels;
using Modals.DataViewModels;
using PetaPoco;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Implementations
{
    public class CategoryService : ICategoryService
    {
        private readonly AutoMapper.IMapper Mapper;
        public Database Db { get; set; }
        public CategoryService(Database db, AutoMapper.IMapper mapper)
        {
            this.Db = db;
            this.Mapper = mapper;
        }

        public bool AddCategory(Category category)
        {
            Db.Insert("Category", "Id", category);
            return true;
        }

        public CategoryDetailsView GetCategoryById(int categoryId)
        {
            throw new NotImplementedException();
        }

        public List<Category> GetCategories()
        {
            return Db.Query<Category>("Select * from Category ").ToList();
            //return Db.Query<CategoryDetailsView>("Select * from categoryDetailsView ").ToList();
        }
        public List<CategoryDetailsView> GetCategoriesDetails()
        {
            return Db.Query<CategoryDetailsView>("Select * from categoryDetailsView ").ToList();
        }
    }
}
