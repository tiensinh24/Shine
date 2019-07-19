using System;

namespace Shine.Data.Dto.Employees {
    public class EmployeeListDto {
        public int EmployeeId { get; set; }
        public bool Gender { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Telephone { get; set; }
        public string Address { get; set; }

        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string PhotoUrl { get; set; }
    }
}
