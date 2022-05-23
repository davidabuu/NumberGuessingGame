// SPDX-License-Identifier: GPL-3.0

 pragma solidity >=0.7.0 <0.9.0;

 contract NumberGuessingGame{
    address public manager;
    uint256 private correctNumber;
    uint256 private equalNum;
    string public name = "David";
    bool public setNum = false;
    mapping(address => bool) paid;
    address [] public players;
     constructor() {
         manager = msg.sender;
     }
     //To enter Pay
      function enter() public payable {
        require(msg.value > .01 ether);
        paid[msg.sender] = true;
        players.push(msg.sender);
    }
    modifier onlyOwner{
        require(msg.sender == manager);
        _;
    }
     //Set The Number
     function setNumber(uint256 num) public onlyOwner {
         correctNumber = num;
         equalNum = num;
     }
     //Guess The number
     function guessNumber(uint256 guessNum) public {
         //User must pay before guessing
          require(paid[msg.sender]);
        require(guessNum == correctNumber);
         payable(msg.sender).transfer(address(this).balance);
         //Reset The Game
         players = new address[](0);

     }
     //Get All
     function getAllPlayers() public view returns (address [] memory){
         return players;
     }
 }