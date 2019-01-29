using System.Collections.Generic;
using System.Linq;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Shine.Data.Dto;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context) : base(context)
        {
            this._context = context;
        }

        public IEnumerable<ProductsDto> GetProducts()
        {
            var query = _context.Products.Include(p => p.Category).Select(p => new
            {
                p.ProductId,
                p.Name,
                p.Specification,
                p.Price,
                p.ProductType,
                p.Category.CategoryName
            }).AsNoTracking();

            return query.Adapt<IEnumerable<ProductsDto>>();
        }        
    }
}