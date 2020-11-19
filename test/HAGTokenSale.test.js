const HAG = artifacts.require("HAG");
const HAGTokenSale = artifacts.require("HAGTokenSale");
const KycContract = artifacts.require("KycContract");

require("dotenv").config({path: "../.env"});

const chai = require('./chaiConfig');

const BN = web3.utils.BN;

const expect = chai.expect;

contract("HAGTokenSale Test", async (accounts) => {

    const [deployerAccount, recepient, anotherAccount] = accounts;

    it("It should not have any tokens in the deployer account", async () => {
        let instance = await HAG.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("All tokens should be in the HAGTokenSale smart contract", async () => {
        let instance = await HAG.deployed();
        let balanceOfHAGTokenSaleAddress = await instance.balanceOf(HAGTokenSale.address);
        let totalSupply = await instance.totalSupply();
        return expect(balanceOfHAGTokenSaleAddress).to.be.a.bignumber.equal(totalSupply);
    });

    it("should be able to buy tokens", async () => {
        let tokenInstance = await HAG.deployed();
        let tokenSaleInstance = await HAGTokenSale.deployed();
        let kycInstance = await KycContract.deployed();
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
        await kycInstance.setKycCompleted(deployerAccount,{from:  deployerAccount});
        expect(tokenSaleInstance.sendTransaction({ from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
    });

});