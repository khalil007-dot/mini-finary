namespace Projet_visualisation.Models
{
    public class EpargneInvestment
    {
        public int Id { get; set; }
        public string AssetCategory { get; set; }
        public string PlatformOrBank { get; set; }
        public decimal AmountInvested { get; set; }
        public decimal CurrentAmount { get; set; }
        public DateTime PurchaseDate { get; set; }
        
    }
}
