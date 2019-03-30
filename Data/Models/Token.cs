using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Identity;

namespace Shine.Data.Models
{
    public class Token
    {
#region Properties
        [Key]
        [Required]
        public int TokenId { get; set; }

        [Required]
        public string ClientId { get; set; }

        [Required]
        public string Value { get; set; }
        public int Type { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }
#endregion

#region Lazy-Load Properties
        /// <summary>
        /// The user related to this token
        /// </summary>
        public IdentityUser User { get; set; }
#endregion
    }
}
