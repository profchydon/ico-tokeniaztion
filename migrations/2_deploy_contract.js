var HAG = artifacts.require("HAG.sol");
var HAGTokenSale = artifacts.require("HAGTokenSale");
var KycContract = artifacts.require("KycContract");

require("dotenv").config({path: "../.env"});

module.exports = async function (deployer) {
    
    let addr = await web3.eth.getAccounts();

    await deployer.deploy(HAG, process.env.INITIAL_TOKENS);
    await deployer.deploy(KycContract);
    await deployer.deploy(HAGTokenSale, 1, addr[0], HAG.address, KycContract.address);
    
    
    let instance = await HAG.deployed();
    await instance.transfer(HAGTokenSale.address, process.env.INITIAL_TOKENS);
};
