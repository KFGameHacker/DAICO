const DAICO_ProjectList = artifacts.require('DAICO_ProjectList');
const DAICO_Project     = artifacts.require('DAICO_Project');

contract('DAICO ProjectList', async (accounts) =>{

    let PListInstance;
    let project1;

    let investorA = accounts[0];
    let investorB = accounts[1];
    let investorC = accounts[2];

    before(async()=>{

        //delopy a contract
        PListInstance = await DAICO_ProjectList.deployed();

        //create project1
        await PListInstance.createProject('上交易所',100,1000,100000);
        console.log("\nProject List Contract deployed at " + PListInstance.address);

        //get address from project1
        projectList = await PListInstance.getProjects();

        //load contract from address
        project1 = await DAICO_Project.at(projectList[0]);
        console.log("Project "+ await project1.description() +" deployed at " + project1.address);
    });

    it('should has 10 accounts with balance',async() =>{
        let tempBalance;
        for(let i=0;i<accounts.length;i++){
            tempBalance = await web3.eth.getBalance(accounts[i]);
            console.log("account "+i+" is => "+accounts[i]);
            assert.ok(tempBalance);
        }
        console.log("\n");
    });

    it('should deploy ProjectList and Project', async () => {
        assert.ok(PListInstance.address);
        assert.ok(project1.address);
    });

    it('should has right property with project1',async ()=>{
        assert.equal('上交易所',await project1.description());
        assert.equal(100,await project1.minInvest());
        assert.equal(1000,await project1.maxInvest());
        assert.equal(100000,await project1.goal());
        //owner check
    });

    it('should has three investor accounts',async ()=>{
        assert.ok(investorA);
        assert.ok(investorB);
        assert.ok(investorC);
    });

    it('three accounts invest allowed',async ()=>{

        //investor contributes
        await project1.contribute({
            from:investorA,
            value:'1000',
        });

        await project1.contribute({
            from:investorB,
            value:'500',
        });

        await project1.contribute({
            from:investorC,
            value:'800',
        });

        let investmentA = await project1.investors(investorA);
        let investmentB = await project1.investors(investorB);
        let investmentC = await project1.investors(investorC);

        assert.equal(investmentA,1000);
        assert.equal(investmentB,500);
        assert.equal(investmentC,800);
    });

    it('should not invest above minInvest line',async()=>{
        try{
            console.log(await project1.contribute({
                from:investorA,
                value:'90',
            }));
            assert.ok(false);
        }
        catch(err){
            assert.ok(err);
        }
    });

    it('should not invest above maxInvest line',async()=>{
        try{
            console.log(await project1.contribute({
                from:investorA,
                value:'1000000',
            }));
            assert.ok(false);
        }
        catch(err){
            assert.ok(err);
        }
    });

});