const utils = require('./utils.js');

/**
 * Gets all the localStorage data and packs it into an encrpyted string
 * @param {String} passphrase - String passphrase
 * @returns {String} - Encrypted packed data
 */
function exportLocalStorage(passphrase) {
  try {
    const eKey = utils.passToKey(passphrase, 'salt');
    const lsStr = JSON.stringify(localStorage);
    return utils.encrypt(eKey, lsStr);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * Cleans the current localStorage, then decrypts the encrypted database packed data and saves it into localStorage
 * @param {String} passphrase - String passphrase
 * @param {String} dbEncrypted - Database encrypted
 * @returns {Bool} - true if database is imported correctly, otherwise false
 */
function importLocalStorage(passphrase, dbEncrypted) {
  try {
    const eKey = utils.passToKey(passphrase, 'salt');
    const dbExpStr = utils.decrypt(eKey, dbEncrypted);
    const dbExp = JSON.parse(dbExpStr);

    localStorage.clear();
    Object.keys(dbExp).forEach((key) => {
      localStorage.setItem(key, dbExp[key]);
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  exportLocalStorage,
  importLocalStorage,
}
