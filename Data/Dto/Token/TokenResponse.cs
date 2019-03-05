namespace Shine.Data.Dto.Token
{
    public class TokenResponse
    {
        public string Token { get; set; }
        public int Expiration { get; set; }
        public string RefreshToken { get; set; }
        public string UserName { get; set; }
    }
}