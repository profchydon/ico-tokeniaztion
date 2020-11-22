const path = require("path");
require("dotenv").config({path: "./.env"});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Mnemonics = process.env.MNEMONICS;
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777
    },
    ganache_local: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider(Mnemonics, "http://127.0.0.1:7545", AccountIndex),
        network_id: 5777,
    },
    ropsten_infura: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider(Mnemonics, "https://ropsten.infura.io/v3/fa1f5ef56cea421daf1d279a36317487", AccountIndex),
        network_id: 3,
    },
    goerli_infura: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider(Mnemonics, "https://goerli.infura.io/v3/fa1f5ef56cea421daf1d279a36317487", AccountIndex),
        network_id: 5,
    },
    rinkeby_infura: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider(Mnemonics, "https://rinkeby.infura.io/v3/fa1f5ef56cea421daf1d279a36317487", AccountIndex),
        network_id: 4,
    }
  },
  compilers: {
    solc: {
      version: "0.6.1"
    }
  }
};
