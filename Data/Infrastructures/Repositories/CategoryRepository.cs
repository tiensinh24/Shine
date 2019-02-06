using System.Collections.Generic;
using System.Linq;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Shine.Data.Dto.Categories;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories {
    public class CategoryRepository : Repository<Category>, ICategoryRepository {
        private readonly AppDbContext _context;

        public CategoryRepository (AppDbContext context) : base (context) {
            this._context = context;
        }

        public IEnumerable<CategoryDto> GetCategories () {
            var query = _context.Categories.Select (c => new
            {
                c.CategoryId,
                c.CategoryName
            }).OrderBy(c => c.CategoryName).AsNoTracking ();

            return query.Adapt<IEnumerable<CategoryDto>> ();
        }

        public CategoryDto GetCategory(int id)
        {
            var query = _context.Categories.Select(c => new
            {
                c.CategoryId,
                c.CategoryName
            }).FirstOrDefault(c => c.CategoryId == id);

            return query.Adapt<CategoryDto>();
        }
    }
}