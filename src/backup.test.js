const chai = require('chai');
const walletlib = require('../index.js');

const { expect } = chai;

const passphrase = 'this is the passphrase';

describe('[backup.js] export and import localStorage', () => {
  before('fill the localStorage', () => {
    for(let i=0; i<10; i++) {
      localStorage.setItem(`key-${i}`, `value-${i}`);
    }
  });

  it('export and import localStorage', () => {
    // export localStorage
    const exportedData = walletlib.backup.exportLocalStorage(passphrase);
    expect(exportedData).to.be.not.equal(undefined);

    // delete LocalStorage
    localStorage.clear();

    // import localStorage
    const ack = walletlib.backup.importLocalStorage(passphrase, exportedData);
    if (!ack) {
      throw new Error('Error importing database');
    }
    expect(ack).to.be.equal(true);
    for (let i = 0; i < 10; i++) {
      const key = `key-${i}`;
      const value = `value-${i}`;
      const importValue = localStorage.getItem(key);
      expect(importValue).to.be.equal(value);
    }
  });
});

