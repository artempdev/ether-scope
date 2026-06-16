type EtherscanResponse = {
  status: string;
  message: string;
  result: string;
};

async function getBalance(address: string, apiKey: string): Promise<string> {
  const url =
    `https://api.etherscan.io/v2/api?chainid=1&module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Etherscan request failed: HTTP ${response.status}`);
  }

  const data = (await response.json()) as EtherscanResponse;
  if (data.status !== "1") {
    throw new Error(`Etherscan error: ${data.result}`);
  }

  return data.result;
}

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

async function getActivity(address: string, apiKey: string): Promise<Activity> {
  const url =
    `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Etherscan request failed: HTTP ${response.status}`);
  }

  const data = (await response.json()) as TxListResponse;

  if (data.status === "0" && data.message === "No transactions found") {
    return { txCount: 0, firstSeen: null };
  }

  if (data.status !== "1" || !Array.isArray(data.result)) {
    throw new Error(`Etherscan error: ${data.result}`);
  }

  const transactions = data.result;
  const firstSeen = new Date(Number(transactions[0].timeStamp) * 1000).toISOString();

  return { txCount: transactions.length, firstSeen };
}

export { getBalance, getActivity };
