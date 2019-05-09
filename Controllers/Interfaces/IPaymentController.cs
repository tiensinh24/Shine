using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto.Payments;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces {
    public interface IPaymentController {

#region Actions
        Task<ActionResult<PaymentDto>> AddPayment([FromBody] Payment payment);

        Task<ActionResult<PaymentDto>> UpdatePayment([FromBody] Payment payment);

        Task<ActionResult<PaymentDto>> DeletePayment(int paymentId);

#endregion
    }
}
