using System.Collections.Generic;

using Shine.Data.Helpers;

namespace Shine.Data.Helpers
{
    public class Paged<T>
        {

            public IEnumerable<T> Items { get; set; }
            public int PageIndex { get; }
            public int TotalItems { get; }
            public int TotalPages { get; }
            public bool HasPreviousPage { get; }
            public bool HasNextPage { get; }

            public Paged(PaginatedList<T> paginatedList)
            {
                this.Items = paginatedList;
                this.PageIndex = paginatedList.PageIndex;
                this.TotalItems = paginatedList.TotalItems;
                this.TotalPages = paginatedList.TotalPages;
                this.HasPreviousPage = paginatedList.HasPreviousPage;
                this.HasNextPage = paginatedList.HasNextPage;
            }

        }
}
