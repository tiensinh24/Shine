using System.Collections.Generic;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IProductRepository
    {         
         Product GetProduct(int id);
    }
}