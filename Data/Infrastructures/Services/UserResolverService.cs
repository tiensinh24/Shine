using System;
using System.Security.Claims;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Shine.Data.Infrastructures.Services
{
    public class UserResolverService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IServiceProvider _services;

        public UserResolverService(IHttpContextAccessor httpContextAccessor, IServiceProvider services)
        {
            this._httpContextAccessor = httpContextAccessor;
            this._services = services;
        }

        public async Task<IdentityUser> GetCurrentUser()
        {
            var _userManager = new Lazy<UserManager<IdentityUser>>(() =>
                _services.GetRequiredService<UserManager<IdentityUser>>());

            var user = _httpContextAccessor.HttpContext.User;

            return await _userManager.Value.GetUserAsync(user);

        }
    }
}
