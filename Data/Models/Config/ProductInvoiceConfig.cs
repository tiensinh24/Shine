using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config
{
    public class ProductInvoiceConfig : IEntityTypeConfiguration<ProductInvoice>
    {
        public void Configure(EntityTypeBuilder<ProductInvoice> builder)
        {
            builder.HasKey(pi => new {pi.ProductId, pi.InvoiceId});

            builder.HasDiscriminator(pi => pi.ProductInvoiceType)
                .HasValue<ProductInvoiceBuy>(ProductInvoiceTypes.Buy)
                .HasValue<ProductInvoiceSell>(ProductInvoiceTypes.Sell);

            builder.Property(pi => pi.ProductInvoiceType)
                .Metadata.AfterSaveBehavior = PropertySaveBehavior.Save;
        }
    }
}