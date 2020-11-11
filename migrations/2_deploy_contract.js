var HAG = artifacts.require("HAG.sol");

module.exports = async function (deployer) {
    await deployer.deploy(HAG,1000000);
};
