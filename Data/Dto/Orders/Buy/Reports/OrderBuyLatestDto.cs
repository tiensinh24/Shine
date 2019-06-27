using System;

namespace Shine.Data.Dto.Orders.Buy.Reports
{
  public class OrderBuyLatestDto
  {
    public int OrderId { get; set; }
    public string OrderNumber { get; set; }
    public DateTime DateOfIssue { get; set; }
    public DateTime TimeForPayment { get; set; }
    public string SupplierName { get; set; }
    public Single Rating { get; set; }
    public string MainPhotoUrl { get; set; }
    public decimal Value { get; set; }
  }
}