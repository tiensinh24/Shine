namespace Shine.Data.Dto.SupplierProducts
{
    public class SupplierProductListDto
    {
#region Properties
        public int PersonId { get; set; }
        public int ProductId { get; set; }
#endregion

#region Supplier Navigation
        public string FullName { get; set; }
        public bool Gender { get; set; }
        public int Age { get; set; }
#endregion

#region Product Navigation
        public string ProductName { get; set; }
        public string Specification { get; set; }
#endregion
    }
}
