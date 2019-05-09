using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore.ChangeTracking;

using Shine.Data.Dto.Payments;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface IPaymentRepository : IRepository {

#region Get Values

        Task<PaymentDto> GetPaymentAsync(int paymentId);

#endregion

#region Actions

        Task<EntityEntry<Payment>> AddPaymentAsync(Payment payment);

        Task<PaymentDto> UpdatePaymentAsync(Payment payment);

        Task<PaymentDto> DeletePaymentAsync(int paymentId);

#endregion

    }
}
