var Creature = artifacts.require('Creature');
//thing to test:
//1. receiver is not null
contract("1st Creature test",async accounts=>{
    it("test receiver",async ()=>{
        const instance  = await Creature.deployed();
        //let totalsupply = await instance.totalSupply.call();
        let receiver = await instance.receiver.call();
        assert.notEqual(receiver,null,"the receiver is null");
    })
});