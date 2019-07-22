using System.Linq;
using Mapster;

using Shine.Data.Dto.Employees;
using Shine.Data.Dto.Photos;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster
{
    public static class EmployeeSetting
    {
        public static void Setting()
        {
            TypeAdapterConfig<Employee, EmployeeSelectDto>.NewConfig()
                .Map(dest => dest.FullName, src => src.FirstName + " " + src.LastName);

            TypeAdapterConfig<Employee, EmployeeListDto>.NewConfig()
                .Map(dest => dest.FullName, src => src.FirstName + " " + src.LastName)
                .Map(dest => dest.CountryName, src => src.Country.CountryName)
                .Map(dest => dest.DepartmentName, src => src.Department.DepartmentName)
                .Map(dest => dest.PhotoUrl, src => src.Photos.FirstOrDefault(p => p.IsMain == true).PhotoUrl);

            TypeAdapterConfig<Employee, EmployeeDetailDto>.NewConfig()
                 .Map(dest => dest.FullName, src => src.FirstName + " " + src.LastName)
                .Map(dest => dest.CountryName, src => src.Country.CountryName)
                .Map(dest => dest.DepartmentName, src => src.Department.DepartmentName)
                .Map(dest => dest.Photos,
                    src => src.Photos.OrderByDescending(p => p.IsMain)).Adapt<PhotoForEmployeeDto>();

        }
    }
}
