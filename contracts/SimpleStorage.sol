pragma solidity ^0.5.0;

contract SimpleStorage {
  bytes32 ipfsHash;

  function set(bytes32 x) public {
    ipfsHash = x;
  }

  function get() public view returns (bytes32) {
    return ipfsHash;
  }
}
