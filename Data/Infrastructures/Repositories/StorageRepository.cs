using System.Collections.Generic;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Shine.Data.Dto.Storages;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories {
    public class StorageRepository : Repository, IStorageRepository {
        private readonly DbSet<Storage> _repository;

        public StorageRepository(AppDbContext context, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager, IConfiguration configuration) : base(context, roleManager, userManager, configuration) {
            this._repository = _context.Set<Storage>();
        }

        public async Task<IEnumerable<StorageDto>> GetStoragesAsync() {
            var storages = await _repository
                .AsNoTracking()
                .ProjectToType<StorageDto>()
                .ToListAsync();

            return storages;
        }
    }
}
