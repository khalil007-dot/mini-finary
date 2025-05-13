export interface ActionInvestment {
    id?: number;
    ticker: string;         // par exemple “AAPL”, “MSFT”
    platform: string;       // ex “Euronext”, “NASDAQ”
    amountInvested: number; // montant en €
    purchaseDate: string;   // “YYYY-MM-DD”
  }
  