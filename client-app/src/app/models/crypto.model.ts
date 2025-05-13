export interface CryptoInvestment {
    id?: number;
    name: string;           // nom de la crypto
    platform: string;       // nom de la plateforme
    amountInvested: number; // montant en €
    purchasePrice: number;  // prix au moment de l’achat (€/coin)
    purchaseDate: string;   // date au format YYYY-MM-DD
  }
  