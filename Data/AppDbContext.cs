using System;
using Microsoft.EntityFrameworkCore;
using Shine.Data.Models;
using Shine.Data.Models.Config;

namespace Shine.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Cost> Costs { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<People> Peoples { get; set; }
        public DbSet<PeopleProduct> PeopleProducts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductInvoice> ProductInvoices { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new InvoiceConfig());
            modelBuilder.ApplyConfiguration(new PurchasesInvoiceConfig());
            modelBuilder.ApplyConfiguration(new SalesInvoiceConfig());
            modelBuilder.ApplyConfiguration(new PeopleConfig());
            modelBuilder.ApplyConfiguration(new PeopleProductConfig());
            modelBuilder.ApplyConfiguration(new ProductConfig());
            modelBuilder.ApplyConfiguration(new ProductInvoiceConfig());

        }
    }
}