using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vega.Core.Models;

namespace Vega.Core
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext vegaDbContext;

        public VehicleRepository(VegaDbContext vegaDbContext)
        {
            this.vegaDbContext = vegaDbContext;
        }

        public async Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await vegaDbContext.Vehicles.FindAsync(id);
            return Vehicles(new Filter()).SingleOrDefault(v => v.Id == id);
        }

        public void Remove(Vehicle vehicle)
        {
            vegaDbContext.Remove(vehicle);
        }

        public void Add(Vehicle vehicle)
        {
            vegaDbContext.Add(vehicle);
        }

        public IEnumerable<Vehicle> GetVehicles(Filter filter)
        {
            return Vehicles(filter);
        }

        private IEnumerable<Vehicle> Vehicles(Filter filter)
        {
            var vehicles = vegaDbContext.Vehicles
                  .Include(v => v.Features)
                  .ThenInclude(vf => vf.Feature)
                  .Include(v => v.Model)
                  .Include(v => v.Model.Make);

            if (filter.MakeId.HasValue)
                return vehicles.Where(v => v.Model.MakeId == filter.MakeId.Value);
            else
                return vehicles;
        }
    }
}