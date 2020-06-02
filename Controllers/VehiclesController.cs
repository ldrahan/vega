using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vega.Controllers.Resources;
using Vega.Models;

namespace Vega.Controllers
{
    [Route("api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly VegaDbContext vegaDbContext;

        public VehiclesController(IMapper mapper, VegaDbContext vegaDbContext)
        {
            this.vegaDbContext = vegaDbContext;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicleAsync([FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            if (vehicle == null)
                return NotFound();
            vegaDbContext.Vehicles.Add(vehicle);
            vehicle.LastUpdate = DateTime.Now;
            await vegaDbContext.SaveChangesAsync();
            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicleAsync(int id, [FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var vehicle = await vegaDbContext.Vehicles.Include(v => v.Features)
            .SingleOrDefaultAsync(f => f.Id == id);
            if (vehicle == null)
                return NotFound();
            mapper.Map<VehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;
            await vegaDbContext.SaveChangesAsync();
            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicleAsync(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var vehicle = await vegaDbContext.Vehicles.FindAsync(id);
            if (vehicle == null)
                return NotFound();
            vegaDbContext.Remove(vehicle);
            await vegaDbContext.SaveChangesAsync();
            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicleAsync(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var vehicle = await vegaDbContext.Vehicles.Include(v => v.Features)
            .SingleOrDefaultAsync(v => v.Id == id);
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