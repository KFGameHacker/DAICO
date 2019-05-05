import Web3 from 'web3';

let web3;

//if metamask installed
if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    web3 = new Web3(window.web3.currentProvider);

// if metamask not installed
} else {
    web3 = new Web3(new Web3.providers.HttpProvider('mainnet.infura.io/v3/ecec9484016146d9869a0b913d9ea408'));
}

export default web3;