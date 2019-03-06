using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config
{
    public class OrderConfig : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasDiscriminator(i => i.OrderType)
                .HasValue<OrderBuy>(true)
                .HasValue<OrderSell>(false);

            builder.Property(i => i.OrderType)
                .Metadata.AfterSaveBehavior = PropertySaveBehavior.Save;

            builder.Property(i => i.DateOfIssue)
                .HasColumnType("date");            
            builder.Property(i => i.TimeForPayment)
                .HasColumnType("date");            

            builder.HasIndex(i => i.OrderNumber).IsUnique();
            
        }
    }

    public class OrderBuyConfig : IEntityTypeConfiguration<OrderBuy>
    {
        public void Configure(EntityTypeBuilder<OrderBuy> builder)
        {
            
        }
    }

    public class OrderSellConfig : IEntityTypeConfiguration<OrderSell>
    {
        public void Configure(EntityTypeBuilder<OrderSell> builder)
        {
           
        }
    }
}