using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class CategoryRepository : Repository<Category>
    {
        public CategoryRepository(AppDbContext context) : base(context)
        {
        }
    }
}