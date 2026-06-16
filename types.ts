type EtherscanResponse = {
  status: string;
  message: string;
  result: string;
};

type Transaction = { timeStamp: string };
type TxListResponse = {
  status: string;
  message: string;
  result: Transaction[] | string;
};

type Activity = {
  txCount: number;
  firstSeen: string | null;
};

export type { EtherscanResponse, Transaction, TxListResponse, Activity };
