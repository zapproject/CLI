/*!
 * ZAP CLI
 * MIT Licensed
 */
const program = require('commander');
const Storage = require('../../Services/StorageKeys');

program
  .option('-n, --network [network]', 'network name')
  .option('-p, --public [public]', 'public key')
  .option('-s, --privat [privat]', 'private key')
  .parse(process.argv);

const storage = new Storage(program.dbpath);

/**
 * Comand del rows
 */
storage.init()
  .catch(console.error)
  .then((st) => {
    console.log('Delete Rows ..');
    console.log('----------------------------');
    st.del(null, program.network, program.public, program.privat).then((rows) => {
      rows.forEach((row) => {
        if (row) console.log(JSON.stringify(row));
      });
    }).catch(() => {});
  });
