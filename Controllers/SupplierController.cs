using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shine.Data;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SupplierController : ControllerBase
    {
        private readonly SupplierRepository _repository;
        public SupplierController(SupplierRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<SupplierListDto>> GetProducts()
        {
            return _repository.GetSupplierListDto().ToList();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<SupplierListDto> GetSupplier(int id)
        {
            var supplier = _repository.GetSupplierDto(id);
            if (supplier == null)
            {
                return NotFound();
            }
            return supplier;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<SupplierListDto> AddSupplier([FromBody] Supplier supplier)
        {
            _repository.Add(supplier);
            _repository.Commit();
            var supReturn = _repository.GetSupplierDto(supplier.PersonId);
            return supReturn;
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<SupplierListDto> UpdateSupplier([FromBody] Supplier supplier)
        {
            _repository.UpdateSupplier(supplier);
            _repository.Commit();
            var supReturn = _repository.GetSupplierDto(supplier.PersonId);
            return supReturn;
        }

        [HttpDelete("{id}")]
        public ActionResult<int> DeleteSupplier(int id)
        {
            _repository.DeleteSupplier(id);
            _repository.Commit();
            return id;
        }

    }
}
