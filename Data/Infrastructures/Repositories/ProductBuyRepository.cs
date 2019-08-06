using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories {
    public class ProductBuyRepository : Repository, IProductBuyRepository {
        #region Constructor        
        public ProductBuyRepository (AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base (context, roleManager, userManager, configuration) { }
        #endregion

        #region Product

        #region Get Values

        public async Task<PagedList<ProductBuyListDto>> GetPagedProductsAsync (
            PagingParams pagingParams, SortParams sortParams, string filter) {
            var source = _context.Set<ProductBuy> ()
                .AsNoTracking ()
                .ProjectToType<ProductBuyListDto> ();

            switch (sortParams.SortOrder) {
                case "asc":
                    switch (sortParams.SortColumn) {
                        case "productName":
                            source = source.OrderBy (p => p.ProductName);
                            break;
                        case "specification":
                            source = source.OrderBy (p => p.Specification);
                            break;
                        case "categoryName":
                            source = source.OrderBy (p => p.CategoryName);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn) {
                        case "productName":
                            source = source.OrderByDescending (p => p.ProductName);
                            break;
                        case "specification":
                            source = source.OrderByDescending (p => p.Specification);
                            break;
                        case "categoryName":
                            source = source.OrderByDescending (p => p.CategoryName);
                            break;
                    }
                    break;

                default:
                    source = source.OrderBy (c => c.ProductName);
                    break;
            }

            if (!string.IsNullOrEmpty (filter)) {
                source = source.Where (p => (p.ProductName + p.CategoryName).ToLower ().Contains (filter.ToLower ()));
            }

            return await PagedList<ProductBuyListDto>.CreateAsync (source, pagingParams.PageIndex, pagingParams.PageSize);
        }

        public async Task<ProductBuyDetailDto> GetProductAsync (int productId) {
            var query = await _context.Set<ProductBuy> ()
                .AsNoTracking ()
                .ProjectToType<ProductBuyDetailDto> ()
                .FirstOrDefaultAsync (p => p.ProductId == productId);

            return query;
        }

        #endregion

        #region Actions
        public async Task AddProductAsync (ProductBuy productBuy) {
            await _context.Set<ProductBuy> ().AddAsync (productBuy);
        }

        public async Task<ProductBuyDto> UpdateProductAsync (ProductBuy productBuy) {
            var product = await _context.Set<ProductBuy> ()
                .FirstOrDefaultAsync (p => p.ProductId == productBuy.ProductId);

            if (product != null) {
                product.ProductName = productBuy.ProductName;
                product.Specification = productBuy.Specification;
                product.CategoryId = productBuy.CategoryId;
            }

            return product.Adapt<ProductBuyDto> ();
        }

        public async Task<ProductBuyDto> DeleteProductAsync (int productId) {
            var product = await _context.Set<ProductBuy> ()
                .FirstOrDefaultAsync (p => p.ProductId == productId);

            if (product != null) {
                _context.Set<ProductBuy> ().Remove (product);
            }

            return product.Adapt<ProductBuyDto> ();
        }

        public async Task<bool> DeleteProductsAsync (string[] ids) {
            var products = await _context.Set<ProductBuy> ()
                .Where (c => ids.Contains (c.ProductId.ToString ()))
                .ToListAsync ();

            if (products != null) {
                _context.Set<ProductBuy> ().RemoveRange (products);

                return true;
            }
            return false;
        }

        #endregion

        #endregion

        #region StorageProduct

        public async Task<PagedList<ProductRemainDto>> GetPagedProductRemainsAsync (
            PagingParams pagingParams, SortParams sortParams, string filter) {
            var source = _context.Set<ProductBuy> ()
                .AsNoTracking ()
                .ProjectToType<ProductRemainDto> ()
                .Where (p => p.Remain != 0);

            switch (sortParams.SortOrder) {
                case "asc":
                    switch (sortParams.SortColumn) {
                        case "productName":
                            source = source.OrderBy (p => p.ProductName);
                            break;
                        case "specification":
                            source = source.OrderBy (p => p.Specification);
                            break;
                        case "remain":
                            source = source.OrderBy (p => p.Remain);
                            break;

                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn) {
                        case "productName":
                            source = source.OrderByDescending (p => p.ProductName);
                            break;
                        case "specification":
                            source = source.OrderByDescending (p => p.Specification);
                            break;
                        case "remain":
                            source = source.OrderBy (p => p.Remain);
                            break;
                    }
                    break;

                default:
                    source = source.OrderBy (c => c.ProductName);
                    break;
            }

            if (!string.IsNullOrEmpty (filter)) {
                source = source.Where (p => p.ProductName.ToLower ().Contains (filter.ToLower ()));
            }

            return await PagedList<ProductRemainDto>.CreateAsync (source, pagingParams.PageIndex, pagingParams.PageSize);

        }

        public async Task<IEnumerable<ProductStorageRemainDto>> GetProductRemainPerStoragesAsync (int productId) {
            var products = await _context.StorageProducts
                .AsNoTracking ()
                .Include (sp => sp.Storage)
                .Include (sp => sp.Product)
                .Where (sp => sp.Product.ProductType == true && sp.ProductId == productId)
                .GroupBy (sp => new { sp.ProductId, sp.StorageId, sp.Product.ProductName, sp.Storage.Name },
                    sp => sp.Quantity,
                    (key, element) => new ProductStorageRemainDto {
                        ProductId = key.ProductId,
                            StorageId = key.StorageId,
                            ProductName = key.ProductName,
                            StorageName = key.Name,
                            Remain = element.Sum ()
                    })
                .OrderBy (p => p.ProductId)
                .ThenBy (p => p.StorageId)
                .ToListAsync ();

            return products;

        }

        #endregion

    }
}