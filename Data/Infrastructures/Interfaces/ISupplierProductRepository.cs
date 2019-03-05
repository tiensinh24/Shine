using System.Collections.Generic;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ISupplierProductRepository
    {
        IEnumerable<SupplierProductDto> GetSupplierProductsDto();
        IEnumerable<SupplierProductDto> GetProductsForSupplier(int supplierId);
        IEnumerable<ProductsBySupplierDto> GetProductsBySupplier(int supplierId);
        // IEnumerable<ProductBuyListDto> GetProductsNotBySupplier(int supplierId);
        IEnumerable<SupplierProductDto> GetSuppliersByProduct(int productId);
        void UpdateSupplierProduct(PersonProduct supplierProduct);
        void DeleteSupplierProduct(PersonProduct supplierProduct);
    }
}
