import type { EtherscanProvider } from "ethers";
import type { Transaction, Activity } from "./types.ts";

async function getBalance(provider: EtherscanProvider, address: string): Promise<bigint> {
  return provider.getBalance(address);
}

const EIP_7702_PREFIX = "0xef0100";

async function isContract(provider: EtherscanProvider, address: string): Promise<boolean> {
  const code = await provider.getCode(address);
  return code !== "0x" && !code.startsWith(EIP_7702_PREFIX);
}

async function getActivity(provider: EtherscanProvider, address: string): Promise<Activity> {
  const transactions = (await provider.fetch("account", {
    action: "txlist",
    address,
    startblock: 0,
    endblock: 99999999,
    sort: "asc",
  })) as Transaction[];

  if (transactions.length === 0) {
    return { txCount: 0, firstSeen: null };
  }

  const firstSeen = new Date(Number(transactions[0].timeStamp) * 1000).toISOString();
  return { txCount: transactions.length, firstSeen };
}

export { getBalance, getActivity, isContract };
