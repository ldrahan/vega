using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vega.Controllers.Resources;
using Vega.Core;
using Vega.Core.Models;

namespace Vega.Controllers
{
    [Route("api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository vehicleRepository;
        private readonly IUnitOfWork unitOfWork;

        public VehiclesController(IMapper mapper, IUnitOfWork unitOfWork, IVehicleRepository vehicleRepository)
        {
            this.unitOfWork = unitOfWork;
            this.vehicleRepository = vehicleRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicleAsync([FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
            if (vehicle == null)
                return NotFound();
            vehicleRepository.Add(vehicle);
            vehicle.LastUpdate = DateTime.Now;
            await unitOfWork.CompleteAsync();

            vehicle = await vehicleRepository.GetVehicleAsync(vehicle.Id);
            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicleAsync(int id, [FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var vehicle = await vehicleRepository.GetVehicleAsync(id);
            if (vehicle == null)
                return NotFound();
            mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;
            await unitOfWork.CompleteAsync();
            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicleAsync(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var vehicle = await vehicleRepository.GetVehicleAsync(id);
            if (vehicle == null)
                return NotFound();
            vehicleRepository.Remove(vehicle);
            await unitOfWork.CompleteAsync();
            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicleAsync(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var vehicle = await vehicleRepository.GetVehicleAsync(id);
            if (vehicle == null)
                return NotFound();
            else
            {
                var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);
                return Ok(vehicleResource);
            }
        }
    }
}