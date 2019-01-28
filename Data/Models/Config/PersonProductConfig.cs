using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config
{
    public class PersonProductConfig : IEntityTypeConfiguration<PersonProduct>
    {
        public void Configure(EntityTypeBuilder<PersonProduct> builder)
        {
            builder.HasKey(pp => new { pp.PersonId, pp.ProductId });
        }
    }
}