async function getBalance(address: string, apiKey: string) {
  const response = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&apikey=${apiKey}`);
  const data = await response.json();
  return data.result;
}


export { getBalance };

