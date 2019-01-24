using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config
{
    public class ProductConfig : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasDiscriminator(p => p.ProductType)
                .HasValue<ProductBuy>(ProductTypes.Buy)
                .HasValue<ProductSell>(ProductTypes.Sell);
            
            builder.Property(p => p.ProductType)
                .Metadata.AfterSaveBehavior = PropertySaveBehavior.Save;
        }
    }
}