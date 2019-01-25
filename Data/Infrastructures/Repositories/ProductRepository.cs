using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class ProductRepository : CrudRepository<Product>, IProductRepository
    {
        public ProductRepository(AppDbContext context) : base(context)
        {
        }

        public Product GetProduct(int id)
        {
            return (Product)Get(p => p.ProductId.Equals(id));
        }
    }
}