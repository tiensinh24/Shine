using System;

using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models {
    public class StorageProduct : IAuditedEntityBase, ISoftDelete {
        public int StorageId { get; set; }
        public int ProductId { get; set; }
        public DateTime Date { get; set; }
        public decimal Quantity { get; set; }

    }
}
