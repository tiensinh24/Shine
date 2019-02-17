using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class TokenRepository : Repository, ITokenRepository
    {
#region Constructor
        public TokenRepository (AppDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager,
            IConfiguration configuration) : base (context, roleManager, userManager, configuration) { }
#endregion
        public async Task<IActionResult> GetTokenAsync (TokenRequestDto tokenRequestDto)
        {
            try
            {
                // Check if username exist
                var user = await _userManager.FindByNameAsync (tokenRequestDto.Username);
                // Fallback using email
                if (user == null && tokenRequestDto.Username.Contains ("@"))
                {
                    user = await _userManager.FindByEmailAsync (tokenRequestDto.Username);
                }
                // User not found or password mismatch
                if (user == null || !await _userManager.CheckPasswordAsync (user, tokenRequestDto.Password))
                {
                    return new UnauthorizedResult ();
                }
                // Username && password matches: Create the refresh token
                var rt = CreateRefreshToken (tokenRequestDto.ClientId, user.Id);

                // Add the new refresh token to the DB
                _context.Tokens.Add (rt);
                _context.SaveChanges ();

                // Create & return the access token
                var response = CreateAccessToken (user, rt.Value);

                return Json (response);
            }
            catch (System.Exception)
            {
                return new UnauthorizedResult ();
            }
        }

        public async Task<IActionResult> RefreshTokenAsync (TokenRequestDto tokenRequestDto)
        {
            try
            {
                // Check if the received refreshToken exists for the given clientId
                var rt = _context.Tokens.FirstOrDefault (t =>
                    t.ClientId == tokenRequestDto.ClientId
                    && t.Value == tokenRequestDto.RefreshToken);

                if (rt == null)
                {
                    // Refresh token not found or invalid (or invalid clientId)
                    return new UnauthorizedResult ();
                }

                // Check if there's an user with the refresh token's userId
                var user = await _userManager.FindByIdAsync (rt.UserId);

                if (user == null)
                {
                    // UserId not found or invalid
                    return new UnauthorizedResult ();
                }

                // Generate a new refresh token
                var rtNew = CreateRefreshToken (rt.ClientId, rt.UserId);

                // Invalidate the old refresh token (by deleting it)
                _context.Tokens.Remove (rt);

                // Add the new refresh token
                _context.Tokens.Add (rtNew);

                // Persist changes in the DB
                _context.SaveChanges ();

                // Create a new access token...
                var response = CreateAccessToken (rtNew.User, rtNew.Value);

                // ... and send it to the client
                return Json (response);
            }
            catch (System.Exception)
            {
                return new UnauthorizedResult ();
            }
        }

        private TokenResponseDto CreateAccessToken (IdentityUser user, string refreshToken)
        {
            DateTime now = DateTime.UtcNow;

            // Add the registered claims for JWT
            var claims = new []
            {
                new Claim (JwtRegisteredClaimNames.Sub, user.Id),
                new Claim (JwtRegisteredClaimNames.Jti, Guid.NewGuid ().ToString ()),
                new Claim (JwtRegisteredClaimNames.Iat,
                new DateTimeOffset (now).ToUnixTimeSeconds ().ToString ())
                // TODO: add additional claims here
            };

            var tokenExpirationMins = _configuration.GetValue<int> ("Auth:Jwt:TokenExpirationInMinutes");
            var issuerSigningKey = new SymmetricSecurityKey (
                Encoding.UTF8.GetBytes (_configuration["Auth:Jwt:Key"])
            );
            var token = new JwtSecurityToken (
                issuer: _configuration["Auth:Jwt:Issuer"],
                audience : _configuration["Auth:Jwt:Audience"],
                claims : claims,
                notBefore : now,
                expires : now.Add (TimeSpan.FromMinutes (tokenExpirationMins)),
                signingCredentials : new SigningCredentials (
                    issuerSigningKey, SecurityAlgorithms.HmacSha256
                )
            );
            var encodedToken = new JwtSecurityTokenHandler ().WriteToken (token);

            return new TokenResponseDto ()
            {
                Token = encodedToken,
                    Expiration = tokenExpirationMins,
                    RefreshToken = refreshToken,
                    UserName = user.UserName
            };

        }

        private Token CreateRefreshToken (string clientId, string userId)
        {
            return new Token ()
            {
                ClientId = clientId,
                    UserId = userId,
                    Type = 0,
                    Value = Guid.NewGuid ().ToString ("N"),
                    CreatedDate = DateTime.UtcNow
            };
        }
    }
}
