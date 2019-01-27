using System.Collections.Generic;

namespace Shine.Data.Models.Interfaces
{
    public interface IUserSession
    {
        int UserId { get; set; }
        int TenantId { get; set; }
        List<string> Roles { get; set; }
        string UserName { get; set; }
        bool DisableTenantFilter { get; set; }
    }
}