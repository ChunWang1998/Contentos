pragma solidity ^0.5.0;

import "./ERC721Tradable.sol";
import "./RobinToken.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol";
contract Creature is ERC721Tradable{
//erc721
    ERC721Metadata  public erc721metadata;
    address public receiver;
 
//erc20
    RobinToken public New_erc20_token;
    mapping(address=> mapping(uint => address))public pNFT_Token_addrs;

    constructor(address _proxyRegistryAddress)
        public
        ERC721Tradable("TEST", "T1", _proxyRegistryAddress)
    {   
        //erc721 receiver
        receiver = address(this);
    }
//to receive erc721 token
   function onERC721Received(address, address, uint256, bytes memory) public returns (bytes4) {
        return this.onERC721Received.selector;
    }

// approve address(this) on erc721 token contract first (by token owner)(every time you want to deposit)
// test erc721 token contract: 0x865e82A27A36CFf99A2e99EA36d7adA51ca9a1d3
// Add New_erc20_token in your metamask to view the pNFT token

    function depositNFT(address _nftAddress,uint256 _tokenId,uint shares) public{
//erc721 token
        erc721metadata = ERC721Metadata(_nftAddress);
        erc721metadata.safeTransferFrom( msg.sender,receiver, _tokenId);
//erc20 token
        string memory nft_name =Strings.strConcat(erc721metadata.name(),"(", Strings.uint2str(_tokenId),")Shares"); 
        pNFT_Token_addrs[_nftAddress][_tokenId] = address(new RobinToken(nft_name,Strings.uint2str(shares)));
        New_erc20_token = RobinToken(pNFT_Token_addrs[_nftAddress][_tokenId]);
        New_erc20_token.transfer(msg.sender,shares);
    }

// approve address(this) on erc20 token contract(New_erc20_token) first (by receiver)
// if you trasfer pNFTs to B, B should let locker be approved on token contract again
    function withdrawNFT(address _nftAddress,uint256 _tokenId,uint shares) public{
        New_erc20_token = RobinToken(pNFT_Token_addrs[_nftAddress][_tokenId]);
        //check shares are the same
        require(keccak256(abi.encodePacked((Strings.uint2str(shares)))) == keccak256(abi.encodePacked((New_erc20_token.totaltoken()))));
//erc721 token
        erc721metadata = ERC721Metadata(_nftAddress);
        erc721metadata.safeTransferFrom(receiver,msg.sender, _tokenId);

// erc20 token
        New_erc20_token.transferFrom(msg.sender,address(this), shares);
        //burn erc20token
        New_erc20_token.burn(New_erc20_token.INITIAL_SUPPLY());
    }
}