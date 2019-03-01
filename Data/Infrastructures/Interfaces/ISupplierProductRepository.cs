using System.Collections.Generic;

using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ISupplierProductRepository
    {
        IEnumerable<SupplierProductDto> GetSupplierProductsDto();
        IEnumerable<SupplierProductDto> GetProductsForSupplier(int supplierId);
        IEnumerable<SupplierProductDto> GetSuppliersForProduct(int productId);
        void UpdateSupplierProduct(PersonProduct supplierProduct);
        void DeleteSupplierProduct(int personId, int productId);
    }
}
