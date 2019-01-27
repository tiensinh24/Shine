using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{
    public class User  : IAuditedEntityBase, ISoftDelete
    {
        #region Properties
        public int UserId { get; set; }
        [Required]
        [MaxLength(5)]
        public string Gender { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }        
        public DateTime DateOfBirth { get; set; }                
        public string Telephone { get; set; }
        public string Fax { get; set; }        
        #endregion

        #region FK
        public int CountryId { get; set; }
        #endregion

        #region Navigation Properties
        public Country Country { get; set; }
        public IEnumerable<Order> Invoices { get; set; }
        public IEnumerable<UserProduct> UserProduct { get; set; }
        #endregion
    }    
}