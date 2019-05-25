using System;
using System.Collections;

using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models {
    public class StorageProduct : IAuditedEntityBase, ISoftDelete {
        public Guid Id { get; set; }
        public int StorageId { get; set; }
        public int ProductId { get; set; }
        public DateTime Date { get; set; }
        public bool Type { get; set; }
        public decimal Quantity { get; set; }
        public string FromTo { get; set; }

        public Storage Storage { get; set; }
        public Product Product { get; set; }

    }
}
