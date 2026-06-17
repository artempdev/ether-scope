import { EtherscanProvider } from "ethers";
import { NETWORK } from "../constants/index.ts";

function createProvider(apiKey: string): EtherscanProvider {
  return new EtherscanProvider(NETWORK, apiKey);
}

export { createProvider };
