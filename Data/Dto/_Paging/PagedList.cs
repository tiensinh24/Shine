using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace Shine.Data.Dto._Paging
{
    public class PagedList<T>
        {
            public PagedList(List<T> items, int count, int pageIndex, int pageSize)
            {
                this.Items = items;
                this.TotalItems = count;
                this.PageIndex = pageIndex;
                this.PageSize = pageSize;

            }
            
            public List<T> Items { get; set; }
            private int TotalItems { get; }
            private int PageIndex { get; }
            private int PageSize { get; }
            
            private int TotalPages => (int) Math.Ceiling(this.TotalItems / (double) this.PageSize);
            
            public PagingHeader GetHeader()
            {
                return new PagingHeader(
                    this.TotalItems, this.PageIndex, this.PageSize, this.TotalPages
                );
            }

            public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageIndex, int pageSize)
            {
                var count = await source.CountAsync();
                var items = await source.Skip(pageSize * (pageIndex - 1))
                    .Take(pageSize).ToListAsync();

                return new PagedList<T>(items, count, pageIndex, pageSize);
            }
        }
}
