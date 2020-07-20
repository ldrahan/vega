namespace Vega.Extensions
{
    public interface IQueryObject
    {
        string SortBy { get; }
        bool IsSortAscending { get; }
        int PageSize { get; set; }
        int Page { get; set; }
    }
}