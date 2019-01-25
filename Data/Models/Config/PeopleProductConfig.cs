using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config
{
    public class PeopleProductConfig : IEntityTypeConfiguration<PeopleProduct>
    {
        public void Configure(EntityTypeBuilder<PeopleProduct> builder)
        {
            builder.HasKey(pp => new { pp.PeopleId, pp.ProductId });
        }
    }
}