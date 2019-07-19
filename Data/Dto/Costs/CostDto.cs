using System;

namespace Shine.Data.Dto.Costs
{
    public class CostDto
    {
        public int CostId { get; set; }
        public DateTime CostDate { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public bool Currency { get; set; }
        public double Rate { get; set; }
    }
}