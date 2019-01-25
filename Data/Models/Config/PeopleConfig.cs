using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config
{
    public class PeopleConfig : IEntityTypeConfiguration<People>
    {
        public void Configure(EntityTypeBuilder<People> builder)
        {
            builder.HasDiscriminator(p => p.PeopleType)
                .HasValue<User>(PeopleTypes.User)
                .HasValue<Customer>(PeopleTypes.Customer)
                .HasValue<Supplier>(PeopleTypes.Supplier)
                .HasValue<Employee>(PeopleTypes.Employee);

            builder.Property(p => p.PeopleType)
                .Metadata.AfterSaveBehavior = PropertySaveBehavior.Save;

            builder.Property(p => p.DateOfBirth)
                .HasColumnType("date");
        }
    }
}