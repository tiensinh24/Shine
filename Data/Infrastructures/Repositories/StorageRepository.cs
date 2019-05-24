using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Configuration;

using Shine.Data.Dto.Storages;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories {
    public class StorageRepository : Repository, IStorageRepository {
#region Private Fields

        private readonly DbSet<Storage> _repository;

#endregion

#region Constructor

        public StorageRepository(AppDbContext context, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager, IConfiguration configuration) : base(context, roleManager, userManager, configuration) {
            this._repository = _context.Set<Storage>();
        }

#endregion

#region Storage

#region Get Values

        public async Task<IEnumerable<StorageDto>> GetStoragesAsync() {
            var storages = await _repository
                .AsNoTracking()
                .ProjectToType<StorageDto>()
                .ToListAsync();

            return storages;
        }

        public async Task<StorageDto> GetStorageAsync(int storageId) {
            var storage = await _repository
                .AsNoTracking()
                .ProjectToType<StorageDto>()
                .FirstOrDefaultAsync(s => s.StorageId == storageId);

            return storage;
        }

#endregion

#region Actions

#endregion

#endregion

#region StorageProduct

#region Get Values

        public async Task<IEnumerable<StorageProductsListDto>> GetLatestImportProductsAsync(int storageId) {
            var products = await _context.StorageProducts
                .AsNoTracking()
                .Include(s => s.Product)
                .Where(s => s.Type == true && s.StorageId == storageId)
                .OrderByDescending(s => s.Date)
                .ProjectToType<StorageProductsListDto>()
                .Take(5)
                .ToListAsync();

            return products;
        }

        public async Task<IEnumerable<StorageProductsListDto>> GetLatestExportProductsAsync(int storageId) {
            var products = await _context.StorageProducts
                .AsNoTracking()
                .Include(s => s.Product)
                .Where(s => s.Type == false && s.StorageId == storageId)
                .OrderByDescending(s => s.Date)
                .ProjectToType<StorageProductsListDto>()
                .Take(5)
                .ToListAsync();

            return products;
        }

#endregion

#region Actions

        public async Task<StorageProduct> AddStorageProductAsync(StorageProduct model) {
            var query = await _context.StorageProducts
                .AddAsync(model);

            return query.Entity;
        }

        public async Task AddStorageProductsAsync(IEnumerable<StorageProduct> models) {
            await _context.StorageProducts
                .AddRangeAsync(models);
        }

#endregion

#endregion

    }
}
