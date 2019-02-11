using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Shine.Data.Dto.Token;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ITokenRepository
    {
        Task<IActionResult> GetTokenAsync(TokenRequestDto tokenRequestDto);
        Task<IActionResult> RefreshTokenAsync(TokenRequestDto tokenRequestDto);
    }   
}