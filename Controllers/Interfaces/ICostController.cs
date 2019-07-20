using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Shine.Data.Dto.Costs;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces {
    public interface ICostController {

#region Actions
        Task<ActionResult<CostDto>> AddCost([FromBody] Cost cost);

        Task<ActionResult<CostDto>> UpdateCost([FromBody] Cost cost);

        Task<ActionResult<CostDto>> DeleteCost(int costId);

#endregion
    }
}
