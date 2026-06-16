# Address Screener

A small TypeScript script that takes an Ethereum wallet address and prints a
CSV row with the address, its balance, and a few signals useful for screening.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Get a free Etherscan API key from https://etherscan.io/apis and add it to a
   `.env` file (see `.env-example`):

   ```
   ETHERSCAN_API_KEY=your_key_here
   ```

## Usage

```
node index.ts <wallet-address>
```

Example:

```
node index.ts 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
```

Save the output to a CSV file:

```
node index.ts 0x157e4F2ce80779f105ad4c2fA6E32124b622609b > output.csv
```

## Output columns

| Column           | Meaning                                            |
| ---------------- | -------------------------------------------------- |
| `address`        | The wallet address that was screened               |
| `balance_eth`    | Current ETH balance                                |
| `tx_count`       | Number of transactions (capped at 10,000)          |
| `first_seen_utc` | Timestamp of the wallet's first transaction (UTC)  |

An address with no history shows `0` transactions and a blank `first_seen_utc`.
