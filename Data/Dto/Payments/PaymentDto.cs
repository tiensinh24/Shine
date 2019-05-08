using System;

namespace Shine.Data.Dto.Payments {
    public class PaymentDto {
        public int PaymentId { get; set; }
        public int OrderId { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public bool Currency { get; set; }
        public decimal Rate { get; set; }
    }
}
