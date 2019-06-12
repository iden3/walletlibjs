# walletlibjs
Javascript library with utilities for iden3 wallets. This library is a complement to [iden3js core library](https://github.com/iden3/iden3js)


## Usage
```js
const walletlib = require('walletlibjs');

// making an encrypted backup
const encryptedData = walletlib.backup.exportLocalStorage(passphrase);


// import the exported data
const ack = walletlib.backup.importLocalStorage(passphrase, encryptedData);
if (!ack) {
  throw new Error('Error importing database');
}


// passToKey
const eKey = walletlib.utils.passToKey(passphrase, 'salt');

// encrypt
const encryptedData = walletlib.utils.encrypt(eKey, msg);

// decrpyt
const decryptedData = walletlib.utils.decrypt(eKey, encryptedData);
```

