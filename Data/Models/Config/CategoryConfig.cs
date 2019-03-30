using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Shine.Data.Models;

namespace Shine.Data.Models.Config
{
    public class CategoryConfig : IEntityTypeConfiguration<Category>
        {
            public void Configure(EntityTypeBuilder<Category> builder)
            {
                builder.HasDiscriminator(c => c.CategoryType)
                    .HasValue<CategoryBuy>(true)
                    .HasValue<CategorySell>(false);

                builder.Property(c => c.CategoryType).Metadata
                    .AfterSaveBehavior = PropertySaveBehavior.Save;
            }
        }
}
