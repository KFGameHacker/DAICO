const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const ProjectList = artifacts.require("DAICO_ProjectList");
const address = artifacts.require("DAICO_Project");

//load web3 provider
const web3 = new Web3(new HDWalletProvider(
    //yes this is private key but its just test net
    'B3AA99C7D855AA572ADA854CFBDF9599C159B86F3F1046C3BAA1756B0734CB60',
    'rinkeby.infura.io/v3/ecec9484016146d9869a0b913d9ea408'
));

//init a project list contract instance
const contract = ProjectList.at(address);

(async() =>{
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    const projects = [
        {
            description: 'Ethereum DApp Course',
            minInvest: web3.utils.toWei('0.01', 'ether'),
            maxInvest: web3.utils.toWei('0.1', 'ether'),
            goal: web3.utils.toWei('1', 'ether'),
        },
        {
            description: 'Ethereum Video Tutorial',
            minInvest: web3.utils.toWei('0.1', 'ether'),
            maxInvest: web3.utils.toWei('1', 'ether'),
            goal: web3.utils.toWei('5', 'ether'),
        },
    ];

    console.log(projects);

    const owner = accounts[0];
    const results = await Promise.all(projects.map(x=>
        contract.createProject(x.description,x.minInvest,x.maxInvest,x.goal)
    ));

    console.log(results);
}
)