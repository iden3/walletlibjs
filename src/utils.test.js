const chai = require('chai');
const walletlib = require('../index.js');

const { expect } = chai;


describe('[utils.js] encrypt and decrypt', () => {
  it('encrypt and decrypt', () => {
    const passphrase = 'this is the passphrase';
    const msg = 'the test message';

    // get key
    const eKey = walletlib.utils.passToKey(passphrase, 'salt');
    expect(eKey).to.be.equal('/0M/qIj7rYtAh0CHKNF80NAvT6N6pShAkG01eelNhhA=');

    // encrypt
    const encryptedData = walletlib.utils.encrypt(eKey, msg);
    expect(encryptedData).to.be.not.equal(undefined);

    // decrpyt
    const decryptedData = walletlib.utils.decrypt(eKey, encryptedData);
    expect(decryptedData).to.be.equal(msg);

  });
});

