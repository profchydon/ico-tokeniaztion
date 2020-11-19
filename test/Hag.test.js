const HAG = artifacts.require("HAG");

require("dotenv").config({path: "../.env"});

const chai = require('./chaiConfig');

const BN = web3.utils.BN;

const expect = chai.expect;

contract("HAG Test", async (accounts) => {

    const [deployerAccount, recepient, anotherAccount] = accounts;

    beforeEach(async()=> {
        this.HAGToken = await HAG.new(process.env.INITIAL_TOKENS);
    })

    it("All tokens in account 0", async () => {
        let instance = this.HAGToken;
        let totalSupply = await instance.totalSupply();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("Is possible to send tokens between accounts", async () => {
        let sentToken = 1;
        let instance = await this.HAGToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recepient, sentToken)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sentToken)));
        return expect(instance.balanceOf(recepient)).to.eventually.be.a.bignumber.equal(new BN(sentToken));
    });

    it("It is not possible to send more tokens than available in total supply", async () => {
        let instance = await this.HAGToken;
        let deployerAccountBalance = await instance.balanceOf(deployerAccount);
        expect(instance.transfer(recepient, new BN(deployerAccountBalance + 1))).to.eventually.be.rejected;
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(deployerAccountBalance);
    });

});