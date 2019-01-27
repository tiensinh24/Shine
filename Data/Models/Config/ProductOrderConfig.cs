using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config
{
    public class ProductOrderConfig : IEntityTypeConfiguration<ProductOrder>
    {
        public void Configure(EntityTypeBuilder<ProductOrder> builder)
        {
            builder.HasKey(pi => new {pi.ProductId, pi.OrderId});

            builder.HasDiscriminator(pi => pi.ProductOrderType)
                .HasValue<ProductOrderBuy>(true)
                .HasValue<ProductOrderSell>(false);

            builder.Property(pi => pi.ProductOrderType)
                .Metadata.AfterSaveBehavior = PropertySaveBehavior.Save;
        }
    }
}