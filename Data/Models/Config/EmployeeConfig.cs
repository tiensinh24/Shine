using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config {
    public class EmployeeConfig : IEntityTypeConfiguration<Employee> {
        public void Configure(EntityTypeBuilder<Employee> builder) {
            builder.HasMany(e => e.Orders)
                .WithOne(o => o.Employee)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(e => e.DateOfBirth)
                .HasColumnType("date");
        }
    }
}
