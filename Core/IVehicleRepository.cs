using System.Threading.Tasks;
using Vega.Core.Models;

namespace Vega.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true);
        void Remove(Vehicle vehicle);
        void Add(Vehicle vehicle);
    }
}