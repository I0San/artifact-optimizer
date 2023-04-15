# artifact-optimizer

A webpack plugin script that generates an optimized json file from smart contract artifacts. A list of contract names, addresses and ABIs.

This greately decreases the import file sizes compared to standard auto-generated artifact files from Hardhat or Truffle.

[Demo](https://codesandbox.io/p/sandbox/artifact-optimizer-34t3md)

## Installation

```bash
npm install @i0san/artifact-optimizer
```

## Usage
To re-create the result, delete the existing file before re-building (to prevent infinite rebuilding if in watch mode).

```js
const ArtifactOptimizer = require("@i0san/artifact-optimizer");

Webpack.config = {
  plugins: [
    new ArtifactOptimizer({
      inputDirs: ["./my-directory1", "./my-directory2"],
      outputDir: "./",
      outputFileName: "contractsWithABIs.json",
    }),
  ],
};
```

## Result

./contractsWithABIs.json

```js
[
    {
        "name": "Contract1",
        "address": "0x00..."
        "abi": [...]
    },
    ...
]
```
