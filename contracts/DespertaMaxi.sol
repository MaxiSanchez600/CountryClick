// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DespertaMaxi {

    address public owner;

    struct Customer {
        uint loyaltyPoints;
        uint totalMessagesSent;
    }

    struct Flight {
        string name;
        uint256 price;
    }

    uint etherPerPoint = 0.5 ether;

    Flight[] public flights;

    mapping(address => Customer) private customers;
    // mapping(address => bool) private customersJoined;
    // mapping(address => Flight[]) public customerFlights;
    // mapping(address => uint) public customerTotalFlights;

    event FlightPurchased(address indexed customer, uint price);

    constructor() {
        owner = msg.sender;
        // flights.push(Flight("Tokio", 4 ether));
        // flights.push(Flight("Buenos Aires", 3 ether));
        // flights.push(Flight("Madrid", 3 ether));
    }

    function sendMessage () public payable {
        require(msg.value == 1 ether);
        payable(owner).transfer(msg.value);
    }
    
    // function addUser () public {
    //     require(!customersJoined[msg.sender]);

    // }

    // function buyFlight (uint flightIndex) public payable {
    //     Flight storage flight = flights[flightIndex];
    //     require(msg.value == flight.price);

    //     Customer storage customer = customers[msg.sender];
    //     customer.loyaltyPoints += 5;
    //     customer.totalFlights += 1;
    //     customerFlights[msg.sender].push(flight);
    //     customerTotalFlights[msg.sender] ++;

    //     emit FlightPurchased(msg.sender, flight.price);
    // }

    // function totalFlights() public view returns(uint) {
    //     return flights.length;
    // }

    // function redeemLoyaltyPoints() public {
    //     Customer storage customer = customers[msg.sender];
    //     uint etherToRefund = customer.loyaltyPoints * etherPerPoint;
    //     payable(msg.sender).transfer(etherToRefund);
    //     customer.loyaltyPoints = 0;
    // }

    // function getRefundableEther() public view returns (uint) {
    //     return etherPerPoint * customers[msg.sender].loyaltyPoints;
    // }

    // function getAirlineBalance() public isOwner view returns (uint) {
    //     address airlineAddress = owner;
    //     return airlineAddress.balance;
    // }

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }
}