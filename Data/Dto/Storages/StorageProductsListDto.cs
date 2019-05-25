using System;

namespace Shine.Data.Dto.Storages {
    public class StorageProductsListDto {
        public Guid Id { get; set; }
        public int StorageId { get; set; }
        public int ProductId { get; set; }
        public DateTime Date { get; set; }
        public decimal Quantity { get; set; }
        public Boolean Type { get; set; }
        public string FromTo { get; set; }

        public string ProductName { get; set; }

    }
}
