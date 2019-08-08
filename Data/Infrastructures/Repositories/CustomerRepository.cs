using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Customers;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories {
    public class CustomerRepository : Repository, ICustomerRepository {
        private readonly DbSet<Customer> _repository;

        #region Constructor
        public CustomerRepository (AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base (context, roleManager, userManager, configuration) {

            this._repository = context.Set<Customer> ();
        }

        #endregion

        #region Customer

        #region Get Values
        public async Task<IEnumerable<CustomerSelectDto>> GetCustomersSelectAsync () {
            var query = await _repository
                .AsNoTracking ()
                .ProjectToType<CustomerSelectDto> ()
                .OrderBy (c => c.FullName)
                .ToListAsync ();

            return query;
        }

        public async Task<PagedList<CustomerListDto>> GetPagedCustomersAsync (
            PagingParams pagingParams, SortParams sortParams, string filter) {
            var source = _repository
                .AsNoTracking ()
                .ProjectToType<CustomerListDto> ();

            switch (sortParams.SortOrder) {
                case "asc":
                    switch (sortParams.SortColumn) {
                        case "fullName":
                            source = source.OrderBy (s => s.FullName);
                            break;
                        case "dateOfBirth":
                            source = source.OrderBy (s => s.DateOfBirth);
                            break;
                        case "countryName":
                            source = source.OrderBy (s => s.CountryName);
                            break;
                        case "continentName":
                            source = source.OrderBy (s => s.ContinentName);
                            break;
                        case "rating":
                            source = source.OrderBy (s => s.Rating);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn) {
                        case "fullName":
                            source = source.OrderByDescending (s => s.FullName);
                            break;
                        case "dateOfBirth":
                            source = source.OrderByDescending (s => s.DateOfBirth);
                            break;
                        case "countryName":
                            source = source.OrderByDescending (s => s.CountryName);
                            break;
                        case "continentName":
                            source = source.OrderByDescending (s => s.ContinentName);
                            break;
                        case "rating":
                            source = source.OrderByDescending (s => s.Rating);
                            break;
                    }
                    break;

                default:
                    source = source.OrderBy (s => s.FullName);
                    break;
            }

            if (!string.IsNullOrEmpty (filter)) {
                source = source.Where (s => (s.FirstName + s.LastName + s.PersonNumber).ToLower ().Contains (filter.ToLower ()));
            }

            return await PagedList<CustomerListDto>.CreateAsync (source, pagingParams.PageIndex, pagingParams.PageSize);

        }

        public async Task<CustomerDetailDto> GetCustomerAsync (int customerId) {
            var query = await _repository
                .AsNoTracking ()
                .Include (c => c.Country)
                .Include (c => c.Photos)
                .Include (c => c.Orders)
                .FirstOrDefaultAsync (s => s.PersonId == customerId);

            return query.Adapt<CustomerDetailDto> ();
        }

        #endregion

        #region Actions

        public async Task AddCustomerAsync (Customer customer) {
            await _repository.AddAsync (customer);
        }

        public async Task<CustomerDto> UpdateCustomerAsync (Customer customer) {
            var cus = await _repository
                .FirstOrDefaultAsync (s => s.PersonId == customer.PersonId);

            if (cus != null) {
                cus.PersonNumber = customer.PersonNumber;
                cus.FirstName = customer.FirstName;
                cus.LastName = customer.LastName;
                cus.Gender = customer.Gender;
                cus.DateOfBirth = customer.DateOfBirth;
                cus.Telephone = customer.Telephone;
                cus.Fax = customer.Fax;
                cus.Email = customer.Email;
                cus.Address = customer.Address;
                cus.CountryId = customer.CountryId;
            }

            return cus.Adapt<CustomerDto> ();
        }

        public async Task<CustomerDto> DeleteCustomerAsync (int customerId) {
            var customer = await _repository
                .FirstOrDefaultAsync (s => s.PersonId == customerId);

            if (customer != null) {
                _repository.Remove (customer);
            }

            return customer.Adapt<CustomerDto> ();
        }

        public async Task<bool> DeleteCustomersAsync (string[] ids) {
            var customers = await _repository
                .Where (s => ids.Contains (s.PersonId.ToString ()))
                .ToListAsync ();

            if (customers != null) {
                _repository.RemoveRange (customers);

                return true;
            }
            return false;
        }

        #endregion

        #endregion

        #region Orders

        public async Task<IEnumerable<CustomerOrdersDto>> GetOrdersAsync (int customerId) {
            var orders = await _context.Set<OrderSell> ()
                .AsNoTracking ()
                .Where (o => o.PersonId == customerId)
                .ProjectToType<CustomerOrdersDto> ()
                .ToListAsync ();

            return orders;
        }

        public async Task<PagedList<CustomerOrdersDto>> GetPagedOrdersByCustomerAsync (PagingParams pagingParams, SortParams sortParams, string filter, int customerId) {
            var source = _context.Set<OrderSell> ()
                .AsNoTracking ()
                .ProjectToType<CustomerOrdersDto> ()
                .Where (s => s.PersonId == customerId);

            switch (sortParams.SortOrder) {
                case "asc":
                    switch (sortParams.SortColumn) {
                        case "orderNumber":
                            source = source.OrderBy (p => p.OrderNumber);
                            break;
                        case "dateOfIssue":
                            source = source.OrderBy (p => p.DateOfIssue);
                            break;
                        case "rating":
                            source = source.OrderBy (p => p.Rating);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn) {
                        case "orderNumber":
                            source = source.OrderByDescending (p => p.OrderNumber);
                            break;
                        case "dateOfIssue":
                            source = source.OrderByDescending (p => p.DateOfIssue);
                            break;
                        case "rating":
                            source = source.OrderByDescending (p => p.Rating);
                            break;
                    }
                    break;

                default:
                    source = source.OrderByDescending (c => c.DateOfIssue);
                    break;
            }

            if (!string.IsNullOrEmpty (filter)) {
                source = source.Where (p => (p.OrderNumber + p.DateOfIssue).ToLower ().Contains (filter.ToLower ()));
            }

            return await PagedList<CustomerOrdersDto>.CreateAsync (source, pagingParams.PageIndex, pagingParams.PageSize);

        }

        #endregion

    }
}