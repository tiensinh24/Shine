using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Configuration;

using Shine.Data.Dto.Payments;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories {
    public class PaymentRepository : Repository, IPaymentRepository {

#region Constructor
        public PaymentRepository(AppDbContext context, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager, IConfiguration configuration) : base(context, roleManager, userManager, configuration) { }

#endregion

#region Get Values

        public async Task<PaymentDto> GetPaymentAsync(int paymentId) {
            var query = await _context.Payments
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.PaymentId == paymentId);

            return query.Adapt<PaymentDto>();
        }

#endregion

#region Actions

        public async Task<EntityEntry<Payment>> AddPaymentAsync(Payment payment) {
            var query = await _context.Payments.AddAsync(payment);

            return query;
        }

        public async Task<PaymentDto> UpdatePaymentAsync(Payment payment) {
            var dbPayment = await _context.Payments
                .FirstOrDefaultAsync(p => p.PaymentId == payment.PaymentId);

            if (dbPayment != null) {
                dbPayment.OrderId = payment.OrderId;
                dbPayment.PaymentDate = payment.PaymentDate;
                dbPayment.Amount = payment.Amount;
                dbPayment.Currency = payment.Currency;
                dbPayment.Rate = payment.Rate;
            }

            return dbPayment.Adapt<PaymentDto>();
        }

        public async Task<PaymentDto> DeletePaymentAsync(int paymentId) {
            var payment = await _context.Payments
                .FirstOrDefaultAsync(p => p.PaymentId == paymentId);

            if (payment != null) {
                _context.Payments.Remove(payment);
            }

            return payment.Adapt<PaymentDto>();
        }

#endregion

    }
}
