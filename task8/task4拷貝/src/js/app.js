//test addr:0xD6FdDf78025f70d8c0FC0784EE40882a004d57D4(rinkeby)
App = {
  web3Provider: null,
  contracts: {},
  lockercontracts:{},
  tokencontracts:{},
  web3: null,
  metadata_uri: null,
  contract_owner: null,
  contractAddress:null,
  receiver:null,
  shares:null,
  locker:null,
  data_id:null,
  not_allow_id:[],

  init: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    App.web3 = new Web3(App.web3Provider);

    return await App.initContract();
  },
  initContract: async function () {

    get_contract = async function(){
      contract = document.myForm.contract;
      contractAddress = contract.value;
      return await App.read_contract(contractAddress);
     }
     get_receiver = function(){
       receiverr = document.myForm.receiver;
       receiver = receiverr.value;
     }
     get_shares = function(){
       sharess = document.myForm.shares;
       shares = sharess.value;
     }

  },  
  read_contract:async function(contractAddress){
    //set locker
    //locker = "0x3bc9ADc86855ccaeF602600a221f43E65D24907d";
    locker = "0x114C50560E26C9dB1C7491144D275F3eCdc3caBF";
    // rinkeby 
    var contractABI = [{"inputs":[{"internalType":"address","name":"_proxyRegistryAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"baseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"mintTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    var lockercontractABI = [{"inputs":[{"internalType":"address","name":"_proxyRegistryAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"New_erc20_token","outputs":[{"internalType":"contract RobinToken","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"baseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_nftAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"}],"name":"depositNFT","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"erc721metadata","outputs":[{"internalType":"contract ERC721Metadata","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"mintTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"pNFT_Token_addrs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"receiver","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_nftAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"}],"name":"withdrawNFT","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    
    try{
      App.contracts.erc721 = new App.web3.eth.Contract(contractABI, contractAddress);
      App.lockercontracts.erc721 = new App.web3.eth.Contract(lockercontractABI, locker);

      contract_owner = await this.contracts.erc721.methods
      .owner()
      .call()
      console.log("owner: "+contract_owner);
    }catch (e) {
      console.error(e)
    }


    return await App.readTokenSupply();
  },
  readTokenSupply: async function () {
    var  amount;

    try {
      amount = await this.contracts.erc721.methods
        .totalSupply()
        .call()
      console.log('Supply: ' + amount);
    } catch (e) {
      console.error(e)
    }

    return await App.get_metadata(amount);
  },
  get_metadata: async function(amount){
    var metadata_uris = [];
    try{
      for(var i =1;i <=amount; i ++){
        metadata_uri = await this.contracts.erc721.methods
          .tokenURI(i)
          .call()
        //console.log("get metadata website: " + metadata_uri)
        metadata_uris.push(metadata_uri);
      }
    } catch (e) {
      console.log(e)
    }
    if (metadata_uris.length!=amount) console.log("get metadata uri fail");
    else return await App.XML_setting(metadata_uris,amount);
  },
  XML_setting: async function(metadata_uris,amount){
  // reference:
  //https://kakadodo.github.io/2018/08/27/js-about-javascript-XMLHttpRequest/
    var _data = [];
    var init_index = 1;
    try{
      for(var i =0;i <amount; i ++){

      //grab json file to use
       
        getData(showData);

        async function showData(result,index){
          var jsonfile = JSON.parse(result);
          jsonfile.index = parseInt(index);
          _data.push(jsonfile);
          if(_data.length == amount) return await App.sort_data(_data,amount);
        };

        function getData(callback){
          var xhr =  new XMLHttpRequest()
          xhr.open('GET',metadata_uris[i], true)  //each metadata uri has diff speed to send
          xhr.index = init_index++;//pass the index for ordering
          xhr.send()
          xhr.onload =  function(){
            callback(this.responseText,xhr.index);
          }

        }
      }
    }catch(e){
      console.log(e);
    }

  },
  sort_data: async function(_data,amount){
    //make sure the ordering
    _data.sort(function(a, b) {
      return a.index - b.index;
    });
    return await App.HTML_setting(_data,amount);
  },
  HTML_setting: async function(_data,amount){
    var itemRow = $('#itemRow');
    not_allow_idd = [];
    var current_user ;

    for(var i =0;i < amount; i ++){
      var Template = $('#Template');
      token_owner = await App.contracts.erc721.methods
      .ownerOf(i+1)
      .call()
      App.web3.eth.getAccounts().then(async function(addrs ){
        current_user = addrs[0];
      });

      if(current_user == token_owner){
        Template.find('.panel-title').text(_data[i].name);
      }
      else{
        Template.find('.panel-title').text("Not allow");
        not_allow_idd.push(i);
      }

      Template.find('img').attr('src',_data[i].image);

      Template.find('.btn-deposit').attr('data-id', i+1);// put index into button 

      Template.find('.btn-withdraw').attr('data-id', i+1);// put index into button 

      Template.find('.btn-deposit_approve').attr('data-id', i+1);// put index into button 
      
      Template.find('.btn-withdraw_approve').attr('data-id', i+1);// put index into button 

      Template.find('.btn-deposit').attr('data-metadata', _data[i].description);// put metadata into button
      
      Template.find('.btn-withdraw').attr('data-metadata', _data[i].description);// put metadata into button 

      Template.find('.btn-deposit_approve').attr('data-metadata', _data[i].description);// put metadata into button
      
      Template.find('.btn-withdraw_approve').attr('data-metadata', _data[i].description);// put metadata into button 

      itemRow.append(Template.html());
  }
    not_allow_id =  not_allow_idd;

    //user balance
    token_owner_balance = await App.contracts.erc721.methods
    .balanceOf(current_user)
    .call()
    $("#NFT_percentage1").text(token_owner_balance);
    $("#NFT_percentage2").text(amount);
    //console.log(token_owner_balance);

    return await App.not_allow_id_setting();
  },
  not_allow_id_setting: async function(){
    button_in_nft = 4;

    for(var i = 0;i <= not_allow_id.length; i++ ){
      for(var j = not_allow_id[i]*button_in_nft;j<not_allow_id[i]*button_in_nft+button_in_nft;j++){
        document.getElementsByClassName("btn-setting")[j].style.backgroundColor = "red";
        document.getElementsByClassName("btn-setting")[j].disabled = "true";
      }
    }

    return await App.bindEvents();
  },
  bindEvents: function() {
    $(document).on('click', '.btn-deposit', App.transfer_step);
    $(document).on('click', '.btn-withdraw', App.withdraw_step);
    $(document).on('click', '.btn-deposit_approve', App.deposit_approve_step);
    $(document).on('click', '.btn-withdraw_approve', App.withdraw_approve_step);

    $(document).on('click', '.btn-check', App.show_pNFTs_Token_addr);
  },
  //fail if you don't approve
  transfer_step:  async function(event) {
    event.preventDefault();
    var metadata_id =  parseInt($(event.target).data('id'));
   

    var int_shares = parseInt(shares);
    console.log(metadata_id);
    token_owner = await App.contracts.erc721.methods
    .ownerOf(metadata_id)
    .call()
    console.log("the token owner: "+token_owner);
    
    App.web3.eth.getAccounts().then(async function(addrs ){
      try{
      var addr = addrs[0];
      var metadata_id = parseInt($(event.target).data('id'));
      data_id = metadata_id;
      if(addr == token_owner){  
          //await App.contracts.erc721.methods.transferFrom(addr, locker, metadata_id)
          await App.lockercontracts.erc721.methods.depositNFT(contractAddress,metadata_id,int_shares)
          .send({
            from: addr
        });
      }   
      else alert("you are not the token owner:"+ token_owner);
    }catch(e){
      alert(e.message);
    }
    });
  },
  withdraw_step:  async function(event) {
    event.preventDefault();
    var metadata_id =  parseInt($(event.target).data('id'));
    var int_shares = parseInt(shares);
    console.log(metadata_id);
    token_owner = await App.contracts.erc721.methods
    .ownerOf(metadata_id)
    .call()
    console.log("the token owner: "+token_owner);

    App.web3.eth.getAccounts().then(async function(addrs ){
      try{
        var addr = addrs[0];
        var metadata_id = parseInt($(event.target).data('id'));
        await App.lockercontracts.erc721.methods.withdrawNFT(contractAddress,metadata_id,int_shares)
        .send({
          from: addr
        });
      }catch(e){
        alert(e.message);
      }
    });
  },
  deposit_approve_step:  async function(event) {
    
    App.web3.eth.getAccounts().then(async function(addrs ){
      try{
        var addr = addrs[0];
        var metadata_id = parseInt($(event.target).data('id'));
        
        await App.contracts.erc721.methods.approve(locker,metadata_id)
        .send({
          from: addr
        });
      }catch(e){
        alert(e.message);
      }
    });
  },
  withdraw_approve_step:  async function(event) {
    var int_shares = parseInt(shares);
    try{
      var metadata_id = parseInt($(event.target).data('id'));
      var tokenABI = [{"inputs":[{"internalType":"string","name":"newname","type":"string"},{"internalType":"string","name":"newcost","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DECIMALS","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totaltoken","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
      var tokenaddr = await App.lockercontracts.erc721.methods.pNFT_Token_addrs(contractAddress,metadata_id).call();
      App.tokencontracts.erc721 = new App.web3.eth.Contract(tokenABI, tokenaddr);
    }catch(e){
      alert(e.message);
    }

    App.web3.eth.getAccounts().then(async function(addrs ){
      try{
        var addr = addrs[0];
        await App.tokencontracts.erc721.methods.approve(locker,int_shares)
        .send({
          from: addr
        });
      }catch(e){
        alert(e.message);
      }
    });

  },
  show_pNFTs_Token_addr: async function(){
    var pNFTs_token_addr = await App.lockercontracts.erc721.methods
    .pNFT_Token_addrs(contractAddress,data_id)
    .call()
    $("#pNFTs_addr").text(pNFTs_token_addr);
  }

  

};
$(function() {
  $(window).load(function() {
    App.init();
  });
});