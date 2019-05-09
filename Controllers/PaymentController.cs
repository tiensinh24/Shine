using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Shine.Controllers.Interfaces;
using Shine.Data.Dto.Payments;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Controllers {

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PaymentController : ControllerBase, IPaymentController {

#region Private Fields
        private readonly IPaymentRepository _repository;

#endregion

#region Constructor
        public PaymentController(IPaymentRepository repository) {
            this._repository = repository;
        }

#endregion

#region Actions

        [HttpPost]
        public async Task<ActionResult<PaymentDto>> AddPayment([FromBody] Payment payment) {
            var query = await _repository.AddPaymentAsync(payment);

            if (query != null) {
                await _repository.CommitAsync();
            }

            return query.Entity.Adapt<PaymentDto>();
        }

        [HttpPut]
        public async Task<ActionResult<PaymentDto>> UpdatePayment([FromBody] Payment payment) {
            var query = await _repository.UpdatePaymentAsync(payment);

            if (query == null) return NotFound();

            await _repository.CommitAsync();

            return query;
        }

        [HttpDelete("{paymentId}")]
        public async Task<ActionResult<PaymentDto>> DeletePayment(int paymentId) {
            var payment = await _repository.DeletePaymentAsync(paymentId);

            if (payment == null) return NotFound();

            await _repository.CommitAsync();

            return payment;
        }

#endregion

    }
}
