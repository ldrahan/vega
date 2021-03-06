using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Core.Models;

namespace Vega.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true);
        void Remove(Vehicle vehicle);
        void Add(Vehicle vehicle);
        Task<QueryResult<Vehicle>> GetVehiclesAsync(VehicleQuery filter);
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}