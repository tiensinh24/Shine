namespace Shine.Data.Dto.Suppliers.Reports
{
    public class SupplierDebtDto
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string MainPhotoUrl { get; set; }
        public decimal Debt { get; set; }
    }
}