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
                .HasValue<PurchasesInvoice>(InvoiceTypes.Buy)
                .HasValue<SalesInvoice>(InvoiceTypes.Sell);

            builder.Property(i => i.InvoiceType)
                .Metadata.AfterSaveBehavior = PropertySaveBehavior.Save;
        }
    }
}