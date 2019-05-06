import web3 from './web3';
import Project from '../build/contracts/DAICO_Project.json';
import address from 'web3-utils';

const getContract = address => new web3.eth.Contract(JSON.parse(Project.interface),address);

export default getContract;