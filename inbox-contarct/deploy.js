require("dotenv").config();

const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { interface: abi, bytecode } = require("./compile");

const provider = new HDWalletProvider({
    mnemonic: {
        phrase: process.env.MNEMONIC_PHRASE,
    },
    providerOrUrl: process.env.INFURA_ENDPOINT,
});

const web3 = new Web3(provider);

async function deploy() {
    const accounts = await web3.eth.getAccounts();

    console.log("Prepare to deploy from account:", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(abi))
        .deploy({
            data: bytecode,
            arguments: ["Hello my first contract!"],
        })
        .send({ from: accounts[0], gas: "1000000" });

    console.log("Contract deployed to:", result.options.address); // 0xFfdA8e63732ea599c99ae5873276031390D7d50b

    provider.engine.stop();
}

deploy();
