namespace Projet_visualisation.Models
{
    public class CryptoInvestment
    {
        public int Id { get; set; }
        public string AssetCategory { get; set; } // Crypto, Action, Épargne
        public string PlatformOrBank { get; set; } // Bitcoin, Apple, etc.
        public decimal AmountInvested { get; set; }
        public decimal CurrentAmount { get; set; }
        public DateTime PurchaseDate { get; set; }
    }

}