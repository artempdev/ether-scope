import { config } from "dotenv";
import { formatEther, isAddress } from "ethers";
import { createProvider } from "./providers/index.ts";
import {
  countFlaggedContacts,
  getActivity,
  getBalance,
  isContract,
  loadWatchlist,
} from "./utils/screen-address.ts";

config({ quiet: true });

const apiKey = process.env.ETHERSCAN_API_KEY;
const address = process.argv[2];

const watchlist = loadWatchlist();

async function main() {
  if (!apiKey) {
    console.error("Missing ETHERSCAN_API_KEY. Add it to your .env file.");
    process.exit(1);
  }

  if (!address) {
    console.error("Usage: node src/index.ts <wallet-address>");
    process.exit(1);
  }

  if (!isAddress(address)) {
    console.error(`Invalid Ethereum address: ${address}`);
    process.exit(1);
  }

  const provider = createProvider(apiKey);

  const [balanceWei, activity, contract] = await Promise.all([
    getBalance(provider, address),
    getActivity(provider, address),
    isContract(provider, address),
  ]);

  const row = {
    address,
    balance_eth: formatEther(balanceWei),
    tx_count: activity.txCount,
    first_seen_utc: activity.firstSeen ?? "",
    is_contract: contract,
    flagged_contacts: countFlaggedContacts(activity.counterparties, watchlist),
  };

  console.log(Object.keys(row).join(","));
  console.log(Object.values(row).join(","));
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
