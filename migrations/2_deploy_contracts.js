const DAICO = artifacts.require("./contracts/DAICO.sol");

module.exports = function(deployer) {
  deployer.deploy(DAICO,'一个大项目',50,10000,100000);
};
