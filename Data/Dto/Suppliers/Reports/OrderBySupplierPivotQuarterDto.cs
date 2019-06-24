namespace Shine.Data.Dto.Suppliers.Reports
{
    public class OrderBySupplierPivotQuarterDto
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public decimal QuarterOne { get; set; }
        public decimal QuarterTwo { get; set; }
        public decimal QuarterThree { get; set; }
        public decimal QuarterFourth { get; set; }
        public decimal Total { get; set; }
    }
}