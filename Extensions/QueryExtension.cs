using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Vega.Core.Models;

namespace Vega.Extensions
{
    public static class QueryExtension
    {
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, IQueryObject queryObj, Dictionary<string, Expression<Func<T, object>>> columnsMapping)
        {
            if (string.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMapping.ContainsKey(queryObj.SortBy))
                return query;
            if (queryObj.IsSortAscending)
                return query.OrderBy(columnsMapping[queryObj.SortBy]);
            else
                return query.OrderByDescending(columnsMapping[queryObj.SortBy]);
        }
    }
}