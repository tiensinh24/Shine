using System.Linq;
using Microsoft.EntityFrameworkCore;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class ProductRepository : Repository<Product>
    {
        public ProductRepository(AppDbContext context) : base(context)
        {
        }
    }
}