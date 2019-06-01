using System;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

using Shine.Data.Dto.Token;
using Shine.Data.Infrastructures.Services;
using Shine.Data.Models;
using Shine.Data.Models.Config;
using Shine.Data.Models.Config.Extentions;
using Shine.Data.Models.Interfaces;

namespace Shine.Data {
    public class AppDbContext : IdentityDbContext {
        private readonly IOptionsSnapshot<HttpContextAccessor> _httpContextAccessor;

#region Constructor
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {
            _httpContextAccessor = this.GetService<IOptionsSnapshot<HttpContextAccessor>>();
        }

#endregion

#region DbSet
        public DbSet<Category> Categories { get; set; }
        public DbSet<Cost> Costs { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<PersonProduct> PersonProducts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductOrder> ProductOrders { get; set; }
        public DbSet<Storage> Storages { get; set; }
        public DbSet<StorageProduct> StorageProducts { get; set; }
        public DbSet<Token> Tokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new CategoryConfig());
            modelBuilder.ApplyConfiguration(new OrderConfig());
            modelBuilder.ApplyConfiguration(new OrderBuyConfig());
            modelBuilder.ApplyConfiguration(new OrderSellConfig());
            modelBuilder.ApplyConfiguration(new PersonConfig());
            modelBuilder.ApplyConfiguration(new EmployeeConfig());
            modelBuilder.ApplyConfiguration(new PersonProductConfig());
            modelBuilder.ApplyConfiguration(new ProductConfig());
            modelBuilder.ApplyConfiguration(new ProductOrderConfig());
            modelBuilder.ApplyConfiguration(new PhotoConfig());
            modelBuilder.ApplyConfiguration(new StorageProductConfig());

            modelBuilder.ShadowProperties();
            SetGlobalQueryFilters(modelBuilder);
        }
#endregion

#region Global Query Filter       

        private void SetGlobalQueryFilters(ModelBuilder modelBuilder) {
            foreach (var tp in modelBuilder.Model.GetEntityTypes()) {
                var t = tp.ClrType;

                // set global filters
                if (typeof(ISoftDelete).IsAssignableFrom(t)) {
                    if (typeof(ITenantEntity).IsAssignableFrom(t)) {
                        // softdeletable and tenant (note do not filter just ITenant - too much filtering! 
                        // just top level classes that have ITenantEntity
                        var method = SetGlobalQueryForSoftDeleteAndTenantMethodInfo.MakeGenericMethod(t);
                        method.Invoke(this, new object[] { modelBuilder });
                    } else {
                        // softdeletable
                        var method = SetGlobalQueryForSoftDeleteMethodInfo.MakeGenericMethod(t);
                        method.Invoke(this, new object[] { modelBuilder });
                        // }
                    }
                }
            }
        }

        private static readonly MethodInfo SetGlobalQueryForSoftDeleteMethodInfo = typeof(AppDbContext).GetMethods(BindingFlags.Public | BindingFlags.Instance)
            .Single(t => t.IsGenericMethod && t.Name == "SetGlobalQueryForSoftDelete");

        public void SetGlobalQueryForSoftDelete<T>(ModelBuilder builder) where T : class, ISoftDelete {
            // *Because Filters can only be defined for the root Entity Type of an inheritance hierarchy,
            //      Use INotRoot mark on derived type to not apply global query filter

            if (!typeof(INotRoot).IsAssignableFrom(typeof(T))) {
                builder.Entity<T>().HasQueryFilter(i => !EF.Property<bool>(i, "IsDeleted"));
            }

        }

        private static readonly MethodInfo SetGlobalQueryForSoftDeleteAndTenantMethodInfo = typeof(AppDbContext).GetMethods(BindingFlags.Public | BindingFlags.Instance)
            .Single(t => t.IsGenericMethod && t.Name == "SetGlobalQueryForSoftDeleteAndTenant");

        public void SetGlobalQueryForSoftDeleteAndTenant<T>(ModelBuilder builder) where T : class, ISoftDelete, ITenantEntity {

            // *Because Filters can only be defined for the root Entity Type of an inheritance hierarchy,
            //      Use INotRoot mark on derived type to not apply global query filter
            if (!typeof(INotRoot).IsAssignableFrom(typeof(T))) {
                builder.Entity<T>().HasQueryFilter(
                    item => !EF.Property<bool>(item, "IsDeleted"));
                // TODO
                // && (_currentUser.DisableTenantFilter || EF.Property<int>(item, "TenantId") == _currentUser.TenantId));
            }

        }

#endregion

#region Automatic Auditing
        public override int SaveChanges(bool acceptAllChangesOnSuccess) {
            OnBeforeSaving();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken)) {
            OnBeforeSaving();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void OnBeforeSaving() {
            var authenticatedUserId = _httpContextAccessor.Value.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            ChangeTracker.DetectChanges();

            var timestamp = DateTime.UtcNow;

            foreach (var entry in ChangeTracker.Entries()) {
                if (entry.Entity is IAuditedEntityBase) {
                    if (entry.State == EntityState.Added || entry.State == EntityState.Modified) {
                        entry.Property("ModifiedOn").CurrentValue = timestamp;
                        entry.Property("ModifiedById").CurrentValue = authenticatedUserId;
                    }

                    if (entry.State == EntityState.Added) {
                        entry.Property("CreatedOn").CurrentValue = timestamp;
                        entry.Property("CreatedById").CurrentValue = authenticatedUserId;
                        if (entry.Entity is ITenant) {
                            // TODO
                            // entry.Property("TenantId").CurrentValue = _currentUser.TenantId;
                        }
                    }
                }

                if (entry.State == EntityState.Deleted && entry.Entity is ISoftDelete) {
                    entry.State = EntityState.Modified;
                    entry.Property("IsDeleted").CurrentValue = true;
                    entry.Property("ModifiedOn").CurrentValue = timestamp;
                    entry.Property("ModifiedById").CurrentValue = authenticatedUserId;
                }
            }

        }
    }
#endregion
}
