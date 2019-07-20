using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Configuration;
using Shine.Data.Dto.Costs;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories {
    public class CostRepository : Repository, ICostRepository {

#region Constructor
        public CostRepository(AppDbContext context, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager, IConfiguration configuration) : base(context, roleManager, userManager, configuration) { }

#endregion

#region Get Values

        public async Task<CostDto> GetCostAsync(int costId) {
            var query = await _context.Costs
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.CostId == costId);

            return query.Adapt<CostDto>();
        }

#endregion

#region Actions

        public async Task<EntityEntry<Cost>> AddCostAsync(Cost cost) {
            var query = await _context.Costs.AddAsync(cost);

            return query;
        }

        public async Task<CostDto> UpdateCostAsync(Cost cost) {
            var dbCost = await _context.Costs
                .FirstOrDefaultAsync(c => c.CostId == cost.CostId);

            if (dbCost != null) {
                dbCost.OrderId = cost.OrderId;
                dbCost.CostDate = cost.CostDate;
                dbCost.Description = cost.Description;
                dbCost.Amount = cost.Amount;
                dbCost.Currency = cost.Currency;
                dbCost.Rate = cost.Rate;
            }

            return dbCost.Adapt<CostDto>();
        }

        public async Task<CostDto> DeleteCostAsync(int costId) {
            var cost = await _context.Costs
                .FirstOrDefaultAsync(c => c.CostId == costId);

            if (cost != null) {
                _context.Costs.Remove(cost);
            }

            return cost.Adapt<CostDto>();
        }

#endregion

    }
}
