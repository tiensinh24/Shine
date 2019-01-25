using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config
{
    public class InvoiceConfig : IEntityTypeConfiguration<Invoice>
    {
        public void Configure(EntityTypeBuilder<Invoice> builder)
        {
            builder.HasDiscriminator(i => i.InvoiceType)
                .HasValue<PurchasesInvoice>(true)
                .HasValue<SalesInvoice>(false);

            builder.Property(i => i.InvoiceType)
                .Metadata.AfterSaveBehavior = PropertySaveBehavior.Save;

            builder.Property(i => i.DateOfIssue)
                .HasColumnType("date");
            builder.Property(i => i.PaymentDateOne)
                .HasColumnType("date");
            builder.Property(i => i.PaymentDateTwo)
                .HasColumnType("date");
            builder.Property(i => i.TimeForPayment)
                .HasColumnType("date");

            builder.HasIndex(i => i.InvoiceNumber).IsUnique();
            
        }
    }

    public class PurchasesInvoiceConfig : IEntityTypeConfiguration<PurchasesInvoice>
    {
        public void Configure(EntityTypeBuilder<PurchasesInvoice> builder)
        {
            builder.Property(bi => bi.LocalDateOfIssue)
                .HasColumnType("date");
        }
    }

    public class SalesInvoiceConfig : IEntityTypeConfiguration<SalesInvoice>
    {
        public void Configure(EntityTypeBuilder<SalesInvoice> builder)
        {
            builder.Property(si => si.RateOne)
                .HasColumnType("decimal(7,2)");
            builder.Property(si => si.RateTwo)
                .HasColumnType("decimal(7,2)");
        }
    }
}