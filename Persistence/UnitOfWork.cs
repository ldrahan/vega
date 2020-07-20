using System.Threading.Tasks;
using Vega.Core;

namespace Vega.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VegaDbContext _vegaDbContext;

        public UnitOfWork(VegaDbContext vegaDbContext)
        {
            _vegaDbContext = vegaDbContext;
        }

        public async Task CompleteAsync()
        {
            await _vegaDbContext.SaveChangesAsync();
        }
    }
}