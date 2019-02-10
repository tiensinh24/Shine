using System.Collections.Generic;
using System.Linq;
using Shine.Data.Dto.Products;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IProductBuyRepository
    {         
         IEnumerable<ProductBuyListDto> GetProductListDto();
         ProductBuyDto GetProductDto(int id);
         void UpdateProduct(ProductBuy productBuy);
         void DeleteProduct(int id);

    }
}