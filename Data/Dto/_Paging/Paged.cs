using System.Collections.Generic;

namespace Shine.Data.Dto._Paging
{
    public class Paged<T> where T : class
    {
        
        public Paged(PagedList<T> pagedList)
        {
        
            this.Paging = pagedList.GetHeader();
            this.Items = pagedList.Items;
        }
        public PagingHeader Paging { get; set; }
        public List<LinkInfo> Links { get; set; }
        public List<T> Items { get; set; }


       
    }

}
