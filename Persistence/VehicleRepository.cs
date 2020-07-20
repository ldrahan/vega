using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vega.Core;
using Vega.Core.Models;
using Vega.Extensions;

namespace Vega.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext _vegaDbContext;

        public VehicleRepository(VegaDbContext vegaDbContext)
        {
            _vegaDbContext = vegaDbContext;
        }

        public async Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await _vegaDbContext.Vehicles.FindAsync(id);
            var vehicles = Vehicles();
            return vehicles.SingleOrDefault(v => v.Id == id);
        }

        public void Remove(Vehicle vehicle)
        {
            _vegaDbContext.Remove(vehicle);
        }

        public void Add(Vehicle vehicle)
        {
            _vegaDbContext.Add(vehicle);
        }

        public async Task<QueryResult<Vehicle>> GetVehiclesAsync(VehicleQuery vehicleQuery)
        {
            var result = new QueryResult<Vehicle>();
            var query = Vehicles();
            if (vehicleQuery.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == vehicleQuery.MakeId.Value);

            var columnsMapping = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.Contact.Name,
                ["id"] = v => v.Id,
            };
            result.TotalItems = await query.CountAsync();
            query = query.ApplyOrdering(vehicleQuery, columnsMapping);

            query = query.ApplyPaging(vehicleQuery);
            result.Items = query;
            return result;
        }

        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
            var vehicle = await _vegaDbContext.Vehicles.Include(v => v.Photos).AsQueryable().FirstOrDefaultAsync(v => v.Id == vehicleId);
            return vehicle.Photos;
        }

        private IQueryable<Vehicle> Vehicles()
        {
            var query = _vegaDbContext.Vehicles
                  .Include(v => v.Features)
                  .ThenInclude(vf => vf.Feature)
                  .Include(v => v.Model)
                  .Include(v => v.Model.Make).AsQueryable();
            return query;
        }
    }
}