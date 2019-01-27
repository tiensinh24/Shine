using System;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Shine.Data.Models;
using Shine.Data.Models.Config;
using Shine.Data.Models.Config.Extentions;
using Shine.Data.Models.Interfaces;

namespace Shine.Data
{
    public class AppDbContext : IdentityDbContext
    {
        // TODO: Inject IUserSession
        // private readonly IUserSession _userSession;
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            // this._userSession = userSession;
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Cost> Costs { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserProduct> UserProducts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductOrder> ProductOrders { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new OrderConfig());
            modelBuilder.ApplyConfiguration(new PurchasesInvoiceConfig());
            modelBuilder.ApplyConfiguration(new SalesInvoiceConfig());
            modelBuilder.ApplyConfiguration(new UserConfig());
            modelBuilder.ApplyConfiguration(new UserProductConfig());
            modelBuilder.ApplyConfiguration(new ProductConfig());
            modelBuilder.ApplyConfiguration(new ProductOrderConfig());

            modelBuilder.ShadowProperties();
            // SetGlobalQueryFilters(modelBuilder);
            base.OnModelCreating(modelBuilder);
        }

        // public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        // {
        //     // ChangeTracker.SetShadowProperties(_userSession);
        //     return await base.SaveChangesAsync(cancellationToken);
        // }

        // private void SetGlobalQueryFilters(ModelBuilder modelBuilder)
        // {
        //     foreach (var tp in modelBuilder.Model.GetEntityTypes())
        //     {
        //         var t = tp.ClrType;
 
        //         // set global filters
        //         if (typeof(ISoftDelete).IsAssignableFrom(t))
        //         {
        //             // if (typeof(ITenantEntity).IsAssignableFrom(t))
        //             // {
        //                 // softdeletable and tenant (note do not filter just ITenant - too much filtering! 
        //                 // just top level classes that have ITenantEntity
        //                 // var method = SetGlobalQueryForSoftDeleteAndTenantMethodInfo.MakeGenericMethod(t);
        //                 // method.Invoke(this, new object[] {modelBuilder});
        //             // }
        //             // else
        //             // {
        //                 // softdeletable
        //                 var method = SetGlobalQueryForSoftDeleteMethodInfo.MakeGenericMethod(t);
        //                 method.Invoke(this, new object[] {modelBuilder});
        //             // }
        //         }
        //     }
        // }
 
        // private static readonly MethodInfo SetGlobalQueryForSoftDeleteMethodInfo = typeof(AppDbContext).GetMethods(BindingFlags.Public | BindingFlags.Instance)
        //     .Single(t => t.IsGenericMethod && t.Name == "SetGlobalQueryForSoftDelete");
 
        // private static readonly MethodInfo SetGlobalQueryForSoftDeleteAndTenantMethodInfo = typeof(AppDbContext).GetMethods(BindingFlags.Public | BindingFlags.Instance)
        //     .Single(t => t.IsGenericMethod && t.Name == "SetGlobalQueryForSoftDeleteAndTenant");        

        // public void SetGlobalQueryForSoftDelete<T>(ModelBuilder builder) where T : class, ISoftDelete
        // {
        //     builder.Entity<T>().HasQueryFilter(item => !EF.Property<bool>(item, "IsDeleted"));
        // }
 
        // // public void SetGlobalQueryForSoftDeleteAndTenant<T>(ModelBuilder builder) where T : class, ISoftDelete, ITenant
        // // {
        // //     builder.Entity<T>().HasQueryFilter(
        // //         item => !EF.Property<bool>(item, "IsDeleted") && 
        // //                 (_userSession.DisableTenantFilter || EF.Property<int>(item, "TenantId") == _userSession.TenantId));
        // // }

        #region Shadow Alt
        //     public override int SaveChanges(bool acceptAllChangesOnSuccess)
        //     {
        //         OnBeforeSaving();
        //         return base.SaveChanges(acceptAllChangesOnSuccess);
        //     }

        //     public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        //     {
        //         OnBeforeSaving();
        //         return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        //     }

        //     private void OnBeforeSaving()
        //     {
        //         var entries = ChangeTracker.Entries();

        //         foreach (var entry in entries)
        //         {
        //             if (entry.Entity is Category ||
        //                 entry.Entity is Cost ||
        //                 entry.Entity is Country ||
        //                 entry.Entity is Order ||
        //                 entry.Entity is User ||
        //                 entry.Entity is UserProduct ||
        //                 entry.Entity is Product ||
        //                 entry.Entity is ProductOrder)
        //             {
        //                 var now = DateTime.UtcNow;
        //                 var user = GetCurrentUser();
        //                 switch (entry.State)
        //                 {
        //                     case EntityState.Modified:
        //                         entry.CurrentValues["LastUpdatedAt"] = now;
        //                         entry.CurrentValues["LastUpdatedBy"] = user;
        //                         break;

        //                     case EntityState.Added:
        //                         entry.CurrentValues["CreatedAt"] = now;
        //                         entry.CurrentValues["CreatedBy"] = user;
        //                         entry.CurrentValues["LastUpdatedAt"] = now;
        //                         entry.CurrentValues["LastUpdatedBy"] = user;
        //                         break;
        //                 }
        //             }
        //         }
        //     }

        //     private object GetCurrentUser()
        //     {
        //         // TODO: Get current login user

        //         throw new NotImplementedException();
        //     }
        // }
        #endregion
    }



    
}