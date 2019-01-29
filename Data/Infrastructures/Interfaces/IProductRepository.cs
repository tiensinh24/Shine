using System.Collections.Generic;
using System.Linq;
using Shine.Data.Dto;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IProductRepository
    {         
         IEnumerable<ProductsDto> GetProducts();
    }
}