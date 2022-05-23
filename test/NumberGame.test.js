const assert = require('assert'); //Validate Expression
const ganche = require('ganache-cli');
const Web3 = require('web3');
const { beforeEach } = require('mocha');
const web3 = new Web3(ganche.provider());
const { abi, evm } = require('../../compile');

let accounts;
let numberContract;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  numberContract = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Deploying', () => {
  it('Deploy contract', () => {
    assert.ok(numberContract.options.address);
  });
  it('Enter The Game', async () => {
    await numberContract.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.2', 'ether'),
    });
    await numberContract.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.2', 'ether'),
    });
  });
  it('Set the number', async () => {
    await numberContract.methods.setNumber('5').send({ from: accounts[0] });
  });
  it('Guess The Number', async () => {
  const errr =   await numberContract.methods.guessNumber('5').send({ from: accounts[0] });
  console.log(errr)
  });
});
