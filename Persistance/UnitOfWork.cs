using System.Threading.Tasks;

namespace Vega.Persistance
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VegaDbContext vegaDbContext;

        public UnitOfWork(VegaDbContext vegaDbContext)
        {
            this.vegaDbContext = vegaDbContext;
        }

        public async Task CompleteAsync()
        {
            await vegaDbContext.SaveChangesAsync();
        }
    }
}