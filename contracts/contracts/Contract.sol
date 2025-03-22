// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserIdentity {
    struct User {
        string username;
        bool registered;
    }

    mapping(address => User) public users;
    event UserRegistered(address indexed userAddress, string username);

    // Function to register a user with a username
    function registerUser(string calldata _username) external {
        require(!users[msg.sender].registered, "User already registered");
        
        users[msg.sender] = User({
            username: _username,
            registered: true
        });

        emit UserRegistered(msg.sender, _username);
    }

    // Function to check if a user is registered
    function isRegistered(address _user) external view returns (bool) {
        return users[_user].registered;
    }
}
