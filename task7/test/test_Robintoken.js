var RobinToken = artifacts.require('RobinToken');
//thing to test:
contract("1st Robintoken test",async accounts=>{
    it("test token",async ()=>{
        const instance  = await RobinToken.deployed("s",500);
        let name = await instance.name.call();
        let symbol = await instance.symbol.call();
        let decimal = await instance.DECIMALS.call();
        assert.notEqual(name,null,"name is null!");
        assert.notEqual(symbol,null,"symbol is null!");
        assert.equal(decimal.toNumber(),18,"decimal is not correct");
    })
}); 