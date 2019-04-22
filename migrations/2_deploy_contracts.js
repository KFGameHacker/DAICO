const DAICO_Project = artifacts.require("./contracts/DAICO_project.sol");
const DAICO_ProjectList = artifacts.require("./contracts/DAICO_ProjectList.sol");
const SafeMath = artifacts.require("./contracts/SafeMath.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.deploy(DAICO_Project,'一个大项目',50,10000,100000);
  deployer.deploy(DAICO_ProjectList);
};
