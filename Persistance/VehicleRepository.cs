using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vega.Models;

namespace Vega.Persistance
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
            return await vegaDbContext.Vehicles
                .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .Include(v => v.Model.Make)
                .SingleOrDefaultAsync(v => v.Id == id);

        }

        public void Remove(Vehicle vehicle)
        {
            vegaDbContext.Remove(vehicle);
        }


        public void Add(Vehicle vehicle)
        {
            vegaDbContext.Add(vehicle);
        }
    }
}