using System.Collections.Generic;

using Shine.Data.Dto.Products;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Dto.Suppliers;

namespace Shine.Data.Dto.SupplierProducts {
    public class ProductsGroupBySupplierDto {
        public SupplierListDto Supplier { get; set; }
        public IEnumerable<ProductsBySupplierDto> Products { get; set; }
    }
}
