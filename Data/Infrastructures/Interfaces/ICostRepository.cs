using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore.ChangeTracking;
using Shine.Data.Dto.Costs;
using Shine.Data.Dto.Payments;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface ICostRepository : IRepository {

#region Get Values

        Task<CostDto> GetCostAsync(int costId);

#endregion

#region Actions

        Task<EntityEntry<Cost>> AddCostAsync(Cost cost);

        Task<CostDto> UpdateCostAsync(Cost cost);

        Task<CostDto> DeleteCostAsync(int costId);

#endregion

    }
}
