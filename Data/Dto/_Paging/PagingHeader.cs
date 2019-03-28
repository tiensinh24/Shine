using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Shine.Data.Dto._Paging
{
    public class PagingHeader
    {
        public int TotalItems { get; }
        public int PageIndex { get; }
        public int PageSize { get; }
        public int TotalPages { get; }
        public bool HasPreviousPage => this.PageIndex > 0;
        public bool HasNextPage => this.PageIndex < (this.TotalPages - 1);
        public int NextPageIndex =>
            this.HasNextPage ? this.PageIndex + 1 : (this.TotalPages - 1);
        public int PreviousPageIndex =>
            this.HasPreviousPage ? this.PageIndex - 1 : 0;

        public PagingHeader(int totalItems, int pageIndex, int pageSize, int totalPages)
        {
            TotalItems = totalItems;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalPages = totalPages;
        }
    }
}
