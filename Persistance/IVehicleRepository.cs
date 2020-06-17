using System.Threading.Tasks;
using Vega.Models;

namespace Vega.Persistance
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true);
        void Remove(Vehicle vehicle);
        void Add(Vehicle vehicle);
    }
}