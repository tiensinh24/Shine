using System.Collections.Generic;

namespace Shine.Data.Dto.Products {
    public class ProductRemainDto {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal Remain { get; set; }
        public IEnumerable<ProductStorageRemainDto> ProductStorageRemains { get; set; }

    }

    public class ProductStorageRemainDto {
        public string StorageName { get; set; }
        public decimal Remain { get; set; }
    }
}
