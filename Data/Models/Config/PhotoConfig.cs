using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config {
    public class PhotoConfig : IEntityTypeConfiguration<Photo> {

        public void Configure(EntityTypeBuilder<Photo> builder) {
            builder.Property(p => p.PersonId).IsRequired(false);
            builder.Property(p => p.ProductId).IsRequired(false);
        }

    }
}
