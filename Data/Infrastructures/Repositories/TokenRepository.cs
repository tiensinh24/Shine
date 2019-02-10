using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Shine.Data.Dto.Token;
using Shine.Data.Infrastructures.Interfaces;

namespace Shine.Data.Infrastructures.Repositories
{
    public class TokenRepository : Repository, ITokenRepository
    {
#region Constructor
        public TokenRepository(AppDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager,
            IConfiguration configuration) : base(context, roleManager, userManager, configuration) { }
#endregion
        public async Task<IActionResult> GetTokenAsync(TokenRequestDto tokenRequestDto)
        {
            // Check if username exist
            var user = await _userManager.FindByNameAsync(tokenRequestDto.Username);
            // Fallback using email
            if (user == null && tokenRequestDto.Username.Contains("@"))
            {
                user = await _userManager.FindByEmailAsync(tokenRequestDto.Username);
            }
            // User not found or password mismatch
            if (user == null || !await _userManager.CheckPasswordAsync(user, tokenRequestDto.Password))
            {
                return new UnauthorizedResult();
            }
            // Username && password matches: Create & return the Jwt token
            DateTime now = DateTime.UtcNow;

            var claims = new []
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat,
                new DateTimeOffset(now).ToUnixTimeSeconds().ToString())
                // TODO: add additional claims here
            };

            var tokenExpirationMins = _configuration.GetValue<int>("Auth:Jwt:TokenExpirationInMinutes");

            var issuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration ["Auth:Jwt:Key"])
            );

            var token = new JwtSecurityToken(
                issuer: _configuration ["Auth:Jwt:Issuer"],
                audience : _configuration ["Auth:Jwt:Audience"],
                claims : claims,
                notBefore : now,
                expires : now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                signingCredentials : new SigningCredentials(
                    issuerSigningKey,
                    SecurityAlgorithms.HmacSha256
                )
            );

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

            // Build & return the response
            var response = new TokenResponseDto()
            {
                Token = encodedToken,
                Expiration = tokenExpirationMins
            };
            return Json(response);
        }
    }
}
