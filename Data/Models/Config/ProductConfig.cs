using System;
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
                .HasValue<ProductBuy>(true)
                .HasValue<ProductSell>(false);
            
            builder.Property(p => p.ProductType)
                .Metadata.AfterSaveBehavior = PropertySaveBehavior.Save;

        }
    }
}