using System.Collections.Generic;
using Shine.Data.Dto.Products;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IProductSellRepository
    {
         IEnumerable<ProductSellListDto> GetProducts();
    }
}