import React, { Component } from "react";
import HAG from "./contracts/HAG.json";
import HAGTokenSale from "./contracts/HAGTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false, kycAddress: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
    
      this.HAGInstance = new this.web3.eth.Contract(
        HAG.abi,
        HAG.networks[this.networkId] && HAG.networks[this.networkId].address,
      );

      this.HAGTokenSaleInstance = new this.web3.eth.Contract(
        HAGTokenSale.abi,
        HAGTokenSale.networks[this.networkId] && HAGTokenSale.networks[this.networkId].address,
      );

      this.KycContractInstance = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded: true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInput = (event) => {
    const { value } = event.target;
    this.setState({ kycAddress: value });
  }

  handleKycWhitelisting = async () => {
    const { kycAddress } = await this.state;
    await this.KycContractInstance.methods.setKycCompleted(kycAddress).send({ from: this.accounts[0] });
    alert(`${kycAddress} has been successfully whitelisted.`)
  }

  render() {
    const { loaded, kycAddress } = this.state;
    if (!loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>HaggleX Token Sale</h1>
        <p>KYC Whitelisting.</p>
        <div class="form-group">
          <label for="">Enter your ethereum address</label>
          <input type="text" class="form-control" name="kycAddress" id="kycAdrress" value={kycAddress} onChange={this.handleInput}/>
        </div>
        <button class="btn" onClick={this.handleKycWhitelisting}>
          Submit    
        </button>
      </div>
    );
  }
}

export default App;
