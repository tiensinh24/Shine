using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Shine.Data;
using Shine.Data.Dto.Token;
using Shine.Data.Infrastructures.Repositories;

namespace Shine.Controllers
{
    [Route("api/[controller]")]
    public class TokenController
    {
#region Constructor
        private readonly TokenRepository _repository;
        public TokenController(TokenRepository repository)
        {
            this._repository = repository;
        }
#endregion

#region WebAPI
        [HttpPost("Auth")]
        public async Task<IActionResult> Jwt([FromBody] TokenRequest tokenRequestDto)
        {
            if (tokenRequestDto == null)
                return new StatusCodeResult(500);

            switch (tokenRequestDto.GrantType)
            {
                case "password":
                    return await _repository.GetTokenAsync(tokenRequestDto);
                case "refresh_token":
                    return await _repository.RefreshTokenAsync(tokenRequestDto);
                default:
                    // Not supported - return a HTTP 401 (Unauthorized)
                    return new UnauthorizedResult();
            }
        }

#endregion
       
    }
}
