using System.Collections.Generic;
using System.Threading.Tasks;

using Shine.Data.Dto.Products;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface IProductRepository : IRepository {
        Task<IEnumerable<ProductSelectDto>> GetProductsSelectAsync();
    }
}
