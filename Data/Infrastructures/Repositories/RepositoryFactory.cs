using System;
using Microsoft.Extensions.DependencyInjection;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class RepositoryFactory
    {
        private IServiceProvider _serviceProvider;

        public RepositoryFactory(IServiceProvider serviceProvider)
        {
            this._serviceProvider = serviceProvider;
        }

        public ProductBuyRepository GetProductRepository()
        {
            return _serviceProvider.GetService<ProductBuyRepository>();
        }
    }
}