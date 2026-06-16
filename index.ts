import { config } from "dotenv";
import { getBalance } from "./screen-address.ts";

config({ quiet: true });

const apiKey = process.env.ETHERSCAN_API_KEY;
const address = process.argv[2];

const ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;

async function main() {
  if (!apiKey) {
    console.error("Missing ETHERSCAN_API_KEY. Add it to your .env file.");
    process.exit(1);
  }

  if (!address) {
    console.error("Usage: node index.ts <wallet-address>");
    process.exit(1);
  }

  if (!ADDRESS_PATTERN.test(address)) {
    console.error(`Invalid Ethereum address: ${address}`);
    process.exit(1);
  }

  const balanceWei = await getBalance(address, apiKey);

  console.log("address,balance_eth");
  console.log(`${address},${balanceWei}`);
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
}