using System.Collections.Generic;
using Shine.Data.Dto.Products;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IProductSellRepository : IRepository
    {
         IEnumerable<ProductSell> GetProducts();
         void UpdateProduct(ProductSell productSell);
         void DeleteProduct(int id);

    }
}