using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config {
    public class PersonConfig : IEntityTypeConfiguration<Person> {
        public void Configure(EntityTypeBuilder<Person> builder) {

            builder.HasDiscriminator(p => p.PersonType)
                .HasValue<Customer>(false)
                .HasValue<Supplier>(true);

            builder.HasMany(p => p.Orders)
                .WithOne(o => o.Person)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(p => p.PersonType).Metadata
                .AfterSaveBehavior = PropertySaveBehavior.Save;

            builder.Property(p => p.DateOfBirth)
                .HasColumnType("date");

        }
    }
}
