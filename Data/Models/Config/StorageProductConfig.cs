using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config {

    public class StorageProductConfig : IEntityTypeConfiguration<StorageProduct> {
        public void Configure(EntityTypeBuilder<StorageProduct> builder) {
            builder.HasKey(sp => new { sp.StorageId, sp.ProductId });

            builder.Property(sp => sp.Date)
                .HasColumnType("date");
        }
    }

}
