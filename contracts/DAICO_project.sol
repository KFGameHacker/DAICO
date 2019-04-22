pragma solidity ^0.5.0;
import "./SafeMath.sol";

//Project for DAICO

contract DAICO_Project {
    using SafeMath for uint;

    //to check the function caller is owner
    modifier ownerOnly(){
        require( msg.sender == owner);
        _;
    }

    //to check the balance is enough
    modifier enoughBalance(uint amount){
        address(this).balance >= amount;
        _;
    }

    struct Payment{
        string description;
        uint amount;
        address payable receiver;
        bool completed;
        //address[] voters;
        mapping(address=>bool) voters;
        uint voterCount;
    }

    address public owner;
    string public description;
    uint public maxInvest;
    uint public minInvest;
    uint public goal;
    //address[] public investors;
    uint public investorCount;
    mapping (address=>uint) public investors;

    Payment[] public payments;

    constructor(string memory _description, uint _minInvest, uint _maxInvest, uint _goal)
        public
    {
        owner       = msg.sender;
        description = _description;
        minInvest   = _minInvest;
        maxInvest   = _maxInvest;
        goal        = _goal;
    }

    function contribute()
        public
        payable
    {

        //money amount checking
        require(msg.value >= minInvest);
        require(msg.value <= maxInvest);

        //require(address(this).balance <= goal);
        //using SafeMath to protect overflow
        uint newBalance = 0;
        newBalance = address(this).balance.add(msg.value);
        require(newBalance <= goal);

        //add msg sender to the investor list 
        // xxxxxxxxx => xxxx wei
        // example:
        // 5D35F3e..D => 100000 wei
        //bug fix: allow investors to invest more than one time
        //and the total invest amount accumulating correctly
        investors[msg.sender] += msg.value;
        investorCount += 1;
    }

    // generate a payment
    function createPayment(string memory _description, uint _amount, address payable _receiver)
        public 
        ownerOnly
        enoughBalance(_amount)
    {

        // build a payment
        Payment memory newPayment = Payment({
            description : _description,
            amount: _amount,
            receiver: _receiver,
            completed: false,
            voterCount:0
        });

        // push payments
        payments.push(newPayment);
    }

    //
    function voteForPayment(uint index)
        public
    {
        Payment storage payment = payments[index];
        
        //check is investor
        require(investors[msg.sender]>0);

        //can't now vote twice
        require(!payment.voters[msg.sender]);

        //set the voter's right to false
        payment.voters[msg.sender] = true;
        
        payment.voterCount += 1;
    }

    function doPay(uint index)
        public
        ownerOnly
        enoughBalance(payments[index].amount)
    {

        Payment storage payment = payments[index];

        //project must be incompleted
        require(!payment.completed);

        //voter must more than half of investors
        require(payment.voterCount > (investorCount/2));

        //transfer the money
        payment.receiver.transfer(payment.amount);

        //set the payment to completed    
        payment.completed = true;
    }
}