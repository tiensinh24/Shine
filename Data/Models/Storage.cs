using System.Collections.Generic;

using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models {
    public class Storage : ISoftDelete {
        public int StorageId { get; set; }
        public string Name { get; set; }

        public IEnumerable<StorageProduct> StorageProducts { get; set; }
    }
}
