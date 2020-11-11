const HAG = artifacts.require("HAG");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("HAG Test", async (accounts) => {

    const [deployerAccount, recepient, anotherAccount] = accounts;

    it("All tokens in account 0", async () => {
        let instance = await HAG.deployed();
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("Is possible to send tokens between accounts", async () => {
        let sentToken = 1;
        let instance = await HAG.deployed();
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recepient, sentToken)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sentToken)));
        expect(instance.balanceOf(recepient)).to.eventually.be.a.bignumber.equal(new BN(sentToken));
    });

});