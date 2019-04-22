pragma solidity ^0.5.0;
import "./SafeMath.sol";
import "./DAICO_project.sol";

contract DAICO_ProjectList{
    using SafeMath for uint;
    address[] public projects;

    function createProject(string memory _description, uint _minInvest, uint _maxInvest, uint _goal)
        public
    {
        address newProject = address(new DAICO_Project(_description,_minInvest,_maxInvest,_goal,msg.sender));
        projects.push(newProject);
    }

    function getProjects()
        public 
        view
        returns(address [] memory)
    {
        return projects;
    }
}