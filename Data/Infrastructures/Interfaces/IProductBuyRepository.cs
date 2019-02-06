using System.Collections.Generic;
using System.Linq;
using Shine.Data.Dto.Products;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IProductBuyRepository
    {         
         IEnumerable<ProductBuyListDto> GetProducts();
         ProductBuyDto GetProduct(int id);
    }
}