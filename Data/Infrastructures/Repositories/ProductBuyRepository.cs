using System.Collections.Generic;
using System.Linq;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Shine.Data.Dto.Products;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class ProductBuyRepository : Repository<ProductBuy>, IProductBuyRepository
    {
        private readonly AppDbContext _context;

        public ProductBuyRepository(AppDbContext context) : base(context)
        {
            this._context = context;
        }

        public IEnumerable<ProductBuyListDto> GetProducts()
        {
            var query = _context.Products.OfType<ProductBuy>().Include(p => p.Category).Select(p => new
            {
                p.ProductId,
                p.Name,
                p.Specification,
                p.Price,
                p.CategoryId,
                p.Category.CategoryName
            }).AsNoTracking();
            return query.Adapt<IEnumerable<ProductBuyListDto>>();
        }        

        public ProductBuyDto GetProduct(int id)
        {
            var query = _context.Products.OfType<ProductBuy>().Select(p => new
            {
                p.ProductId,
                p.Name,
                p.Specification,
                p.Price,
                p.CategoryId
            }).FirstOrDefault();
            return query.Adapt<ProductBuyDto>();
        }
    }
}