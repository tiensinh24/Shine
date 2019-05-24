using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config {

    public class StorageProductConfig : IEntityTypeConfiguration<StorageProduct> {
        public void Configure(EntityTypeBuilder<StorageProduct> builder) {
            builder.HasKey(sp => new { sp.StorageId, sp.ProductId, sp.Date, sp.Type });

            builder.Property(sp => sp.Date)
                .HasColumnType("date");

            builder.Property(sp => sp.Type)
                .HasDefaultValueSql("0");
        }
    }

}
