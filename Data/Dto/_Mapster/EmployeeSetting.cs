using Mapster;

using Shine.Data.Dto.Employees;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster {
    public static class EmployeeSetting {
        public static void Setting() {
            TypeAdapterConfig<Employee, EmployeeSelectDto>.NewConfig()
                .Map(
                    dest => dest.FullName,
                    src => src.FirstName + " " + src.LastName
                );
        }
    }
}
