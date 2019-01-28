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
                .HasValue<BuyOrder>(true)
                .HasValue<SellOrder>(false);

            builder.Property(i => i.OrderType)
                .Metadata.AfterSaveBehavior = PropertySaveBehavior.Save;

            builder.Property(i => i.DateOfIssue)
                .HasColumnType("date");
            builder.Property(i => i.PaymentDateOne)
                .HasColumnType("date");
            builder.Property(i => i.PaymentDateTwo)
                .HasColumnType("date");
            builder.Property(i => i.TimeForPayment)
                .HasColumnType("date");

            builder.HasIndex(i => i.OrderNumber).IsUnique();
            
        }
    }

    public class BuyOrderConfig : IEntityTypeConfiguration<BuyOrder>
    {
        public void Configure(EntityTypeBuilder<BuyOrder> builder)
        {
            builder.Property(bi => bi.LocalDateOfIssue)
                .HasColumnType("date");
        }
    }

    public class SellOrderConfig : IEntityTypeConfiguration<SellOrder>
    {
        public void Configure(EntityTypeBuilder<SellOrder> builder)
        {
            builder.Property(si => si.RateOne)
                .HasColumnType("decimal(7,2)");
            builder.Property(si => si.RateTwo)
                .HasColumnType("decimal(7,2)");
        }
    }
}