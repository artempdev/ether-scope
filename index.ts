import { config } from "dotenv";

config({ quiet: true });

const apiKey = process.env.ETHERSCAN_API_KEY;
const address = process.argv[2];

async function main() {
  if (!address) {
    console.error("Please provide a wallet address");
    process.exit(1);
  }

  console.log(`Screening address: ${address}`);
  console.log(`API key loaded: ${!!apiKey}`);
}


main();
