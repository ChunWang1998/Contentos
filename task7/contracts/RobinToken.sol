pragma solidity ^0.5.0;
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
contract RobinToken is ERC20,ERC20Burnable{
    uint8 public constant DECIMALS = 18;
    uint256 public  INITIAL_SUPPLY = 10000000 * (10 ** uint256(DECIMALS));
    string public totaltoken;
  string public name = "HelloCoin";
  string public symbol = "NFTS";
    constructor (string memory newname,string memory newcost) public {
        _mint(msg.sender, INITIAL_SUPPLY);
        name = newname;
        totaltoken = newcost;
    }


}
// pragma solidity ^0.5.0;
// import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
// import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
// import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";

// contract RobinToken is ERC20,ERC20Burnable{
//     uint8 public constant DECIMALS = 18;
//     uint256 public  INITIAL_SUPPLY = 10000000 * (10 ** uint256(DECIMALS));
//     string public totaltoken;
//   string public name = "HelloCoin";
//   string public symbol = "NFTS";
//     constructor (string memory newname,string memory newcost) public {
//         _mint(msg.sender, INITIAL_SUPPLY);
//         name = newname;
//         totaltoken = newcost;
//     }
// }