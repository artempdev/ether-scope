type Transaction = { timeStamp: string };

type Activity = {
  txCount: number;
  firstSeen: string | null;
};

export type { Transaction, Activity };
