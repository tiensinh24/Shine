using System.Collections.Generic;

namespace Shine.Data.Dto.Products {
    public class ProductRemainDto {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Specification { get; set; }
        public decimal Remain { get; set; }
    }

}
