const DAICO_ProjectList = artifacts.require("DAICO_ProjectList");

let address = '0xb4b61672FE3Db9feD51C0890fE0577b34d94e7af';

module.exports = async()=>{
    const PListInstance = await DAICO_ProjectList.delopyed();
    console.log(PListInstance.address);
}
