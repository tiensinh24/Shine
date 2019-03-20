using System.Collections.Generic;
using System.Linq;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IProductBuyRepository : IRepository
    {         
         IEnumerable<ProductBuyDto> GetProducts();
         ProductBuyDto GetProduct(int id);
         void UpdateProduct(ProductBuy productBuy);
         void DeleteProduct(int id);

    }
}