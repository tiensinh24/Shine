using System.Collections.Generic;

namespace Shine.Data.Dto.Token
{
    public class UserSession
    {
        public string UserId { get; set; }
        public int TenantId { get; set; }
        public List<string> Roles { get; set; }
        public string UserName { get; set; }
        public bool DisableTenantFilter { get; set; }
    }
}
