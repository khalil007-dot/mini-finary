export interface EpargneInvestment {
    id?: number;
    type: string;           // ex “Livret A”, “PEL”, “Assurance-vie”
    amountInvested: number; // montant en €
    interestRate: number;   // taux en %
    purchaseDate: string;   // “YYYY-MM-DD”
  }
  