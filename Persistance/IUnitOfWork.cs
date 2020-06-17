using System.Threading.Tasks;

namespace Vega.Persistance
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}