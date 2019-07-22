using System;

namespace Shine.Data.Dto.Employees {
    public class EmployeeDto {
        public int EmployeeId { get; set; }
        public bool Gender { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Telephone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public int DepartmentId { get; set; }

        public int CountryId { get; set; }
    }
}
