require("dotenv").config();

const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { abi, evm } = require("./compile");

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

    const result = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
        })
        .send({ from: accounts[0], gas: "1000000" });

    console.log("Contract deployed to:", result.options.address); // 0xA14ef754443ed61B190a786EFB586D282B0B7402

    provider.engine.stop();
}

deploy();
