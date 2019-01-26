namespace Shine.Data.Models
{
    public class PeopleProduct : BaseEntity
    {
        #region Properties
        public int PeopleId { get; set; }
        public int ProductId { get; set; }
        #endregion

        #region Navigation Properties
        public People People { get; set; }
        public Product Product { get; set; }
        #endregion
    }
}