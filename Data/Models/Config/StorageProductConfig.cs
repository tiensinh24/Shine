using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config {

    public class StorageProductConfig : IEntityTypeConfiguration<StorageProduct> {
        public void Configure(EntityTypeBuilder<StorageProduct> builder) {
            builder.HasKey(sp => sp.Id);

            builder.Property(sp => sp.Date)
                .HasColumnType("date");

            builder.Property(sp => sp.Id)
                .HasDefaultValueSql("NEWID()");
        }
    }

}
