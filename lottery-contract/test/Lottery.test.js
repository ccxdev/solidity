const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const { abi, evm } = require("../compile");

describe("Lottery", function () {
    let lottery;
    let accounts;

    beforeEach(async function () {
        accounts = await web3.eth.getAccounts();

        lottery = await new web3.eth.Contract(abi)
            .deploy({ data: evm.bytecode.object })
            .send({ from: accounts[0], gas: "1000000" });
    });

    it("Is accounts exists", function () {
        assert.equal(Array.isArray(accounts) && accounts.length >= 1, true);
    });

    it("Contract deployed", function () {
        assert.ok(lottery.options.address);
    });

    it("Manager address is equal to contract creator", async function () {
        const message = await lottery.methods.manager().call();

        assert.equal(message, accounts[0]);
    });
});
