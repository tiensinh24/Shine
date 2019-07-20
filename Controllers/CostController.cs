using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Shine.Controllers.Interfaces;
using Shine.Data.Dto.Costs;
using Shine.Data.Dto.Payments;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Controllers {

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CostController : ControllerBase, ICostController {

#region Private Fields
        private readonly ICostRepository _repository;

#endregion

#region Constructor
        public CostController(ICostRepository repository) {
            this._repository = repository;
        }

#endregion

#region Actions

        [HttpPost]
        public async Task<ActionResult<CostDto>> AddCost([FromBody] Cost cost) {
            var query = await _repository.AddCostAsync(cost);

            if (query != null) {
                await _repository.CommitAsync();
            }

            return query.Entity.Adapt<CostDto>();
        }

        [HttpPut]
        public async Task<ActionResult<CostDto>> UpdateCost([FromBody] Cost cost) {
            var query = await _repository.UpdateCostAsync(cost);

            if (query == null) return NotFound();

            await _repository.CommitAsync();

            return query;
        }

        [HttpDelete("{costId}")]
        public async Task<ActionResult<CostDto>> DeleteCost(int costId) {
            var cost = await _repository.DeleteCostAsync(costId);

            if (cost == null) return NotFound();

            await _repository.CommitAsync();

            return cost;
        }

#endregion

    }
}
