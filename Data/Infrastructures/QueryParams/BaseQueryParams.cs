using System;

namespace Shine.Data.Infrastructures.QueryParams
{
    public class BaseQueryParams
    {
        public string Filter { get; set; }
        public string SortOrder { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get => PageNumber * PageSize; }
    }
}
