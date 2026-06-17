type Transaction = { timeStamp: string; from: string; to: string };

type Activity = {
  txCount: number;
  firstSeen: string | null;
  counterparties: string[];
};

export type { Transaction, Activity };
