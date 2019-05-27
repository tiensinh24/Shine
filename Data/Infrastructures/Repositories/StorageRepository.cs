using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Configuration;

using Shine.Data.Dto._Paging;
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

        public async Task<PagedList<StorageProductsListDto>> GetPagedStorageProductsAsync(int storageId, PagingParams pagingParams, SortParams sortParams, string filter) {
            var source = _context.StorageProducts
                .AsNoTracking()
                .Include(s => s.Product)
                .Where(s => s.StorageId == storageId)
                .ProjectToType<StorageProductsListDto>();

            switch (sortParams.SortOrder) {
                case "asc":
                    switch (sortParams.SortColumn) {
                        case "productName":
                            source = source.OrderBy(s => s.ProductName);
                            break;
                        case "date":
                            source = source.OrderBy(s => s.Date);
                            break;
                        case "type":
                            source = source.OrderBy(s => s.Type);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn) {
                        case "productName":
                            source = source.OrderByDescending(s => s.ProductName);
                            break;
                        case "date":
                            source = source.OrderByDescending(s => s.Date);
                            break;
                        case "type":
                            source = source.OrderByDescending(s => s.Type);
                            break;
                    }
                    break;

                default:
                    source = source.OrderByDescending(s => s.Date);
                    break;
            }

            if (!string.IsNullOrEmpty(filter)) {
                source = source.Where(s =>
                    (s.Date.Day.ToString("00") + s.Date.Month.ToString("00") + s.Date.Year.ToString() + s.ProductName + s.Type)
                    .ToLower().Contains(filter.ToLower())
                    || (s.Date.Year.ToString() + s.Date.Month.ToString("00") + s.Date.Day.ToString("00") + s.ProductName + s.Type)
                    .ToLower().Contains(filter.ToLower())
                );
            }

            return await PagedList<StorageProductsListDto>.CreateAsync(source, pagingParams.PageIndex, pagingParams.PageSize);

        }

#endregion

#region Actions

        public async Task<StorageProduct> AddStorageProductAsync(StorageProduct model) {
            var query = await _context.StorageProducts
                .AddAsync(model);

            return query.Entity;
        }

        public async Task<StorageProduct> UpdateStorageProductAsync(StorageProduct model) {
            var query = await _context.StorageProducts
                .FirstOrDefaultAsync(s => s.Id == model.Id);

            if (query != null) {
                query.ProductId = model.ProductId;
                query.Date = model.Date;
                query.Quantity = model.Quantity;
                query.Type = model.Type;
                query.FromTo = model.FromTo;
            }

            return query;
        }

        public async Task<bool> DeleteStorageProductAsync(int storageId, string id) {
            var query = await _context.StorageProducts
                .FirstOrDefaultAsync(sp => sp.Id.ToString() == id);

            if (query != null) {
                _context.StorageProducts.Remove(query);
                return true;
            }
            return false;
        }

        public async Task<bool> DeleteStorageProductsAsync(string[] ids) {
            var items = await _context.StorageProducts
                .Where(s => ids.Contains(s.Id.ToString()))
                .ToListAsync();

            if (items != null) {
                _context.StorageProducts.RemoveRange(items);

                return true;
            }
            return false;
        }

#endregion

#endregion

    }
}
