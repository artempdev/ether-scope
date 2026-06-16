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


export { getBalance };
