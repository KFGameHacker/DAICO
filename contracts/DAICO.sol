pragma solidity ^0.5.0;
import "./SafeMath.sol";

//Project for DAICO

contract DAICO {
    using SafeMath for uint;

    struct Payment{
        string description;
        uint amount;
        address payable receiver;
        bool completed;
        address[] voters;
    }

    address public owner;
    string public description;
    uint public maxInvest;
    uint public minInvest;
    uint public goal;
    address[] public investors;
    Payment[] public payments;

    constructor(string memory _description, uint _minInvest, uint _maxInvest, uint _goal) public {
        owner       = msg.sender;
        description = _description;
        minInvest   = _minInvest;
        maxInvest   = _maxInvest;
        goal        = _goal;
    }

    function contribute() public payable {

        //money amount checking
        require(msg.value >= minInvest);
        require(msg.value <= maxInvest);
        
        //require(address(this).balance <= goal);
        //using SafeMath to protect overflow
        uint newBalance = 0;
        newBalance = address(this).balance.add(msg.value);
        require(newBalance <= goal);

        //add msg sender to the investor list 
        investors.push(msg.sender);

    }

    // generate a payment
    function createPayment(string memory _description, uint _amount, address payable _receiver) public {

        //only contract owner can create the payment
        //do not checked here.

        // build a payment
        Payment memory newPayment = Payment({
            description : _description,
            amount: _amount,
            receiver: _receiver,
            completed: false,
            voters: new address[](0)
        });

        // push payments
        payments.push(newPayment);
    }

    //
    function approvePayment(uint index) public {
        Payment storage payment = payments[index];
        
        //check is investor
        bool isInvestor = false;
        for(uint i=0;i<investors.length;i++){
            isInvestor = investors[i] == msg.sender;
            if(isInvestor){
                break;
            }
        }
        
        require(isInvestor);

        bool hasVoted = false;
        for(uint j=0;j<payment.voters.length;j++){
            hasVoted = payment.voters[j] == msg.sender;
            if(hasVoted){
                break;
            }
        }

        require(!hasVoted);

        payment.voters.push(msg.sender);
    }

    function doPay(uint index) public {
        Payment storage payment = payments[index];

        //project must be incompleted
        require(!payment.completed);

        //voter must more than half of investors
        require(payment.voters.length>(investors.length/2));

        //transfer the money
        payment.receiver.transfer(payment.amount);

        //set the payment to completed    
        payment.completed = true;
    }
}