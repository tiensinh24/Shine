using System.Collections.Generic;
using Shine.Data.Dto.Products;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IProductSellRepository
    {
         IEnumerable<ProductSell> GetProducts();
    }
}