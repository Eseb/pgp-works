import {Set} from 'immutable';
import createUuid from 'uuid/v4';
import debugLib from 'debug';
import {
  connect,
  closeConnection,
} from './storage-manager';
import Identity from './identity';

const debug = debugLib('pgp-works:identity-store');

const TABLE_NAME = 'certs';
// Map column name to its type.
const TABLE_SCHEMA = {
  guid: 'VARCHAR(36) PRIMARY KEY',
  added: 'TEXT',
  armouredText: 'TEXT',
};

let databaseSetupPromise;

export default function setUpDatabase() {
  debug('Setting up DB for identities.');

  if (databaseSetupPromise) {
    debug('We already set the DB up earlier in this session. Aborting.');
    return databaseSetupPromise;
  }

  const schemaDefinitions = Object.keys(TABLE_SCHEMA).map(columnName =>
    `${columnName} ${TABLE_SCHEMA[columnName]}`,
  );

  databaseSetupPromise = new Promise((resolve) => {
    const db = connect();

    db.serialize(() => {
      debug('Ensuring the identities table is set up.');
      db.run(
        `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (${schemaDefinitions.join(', ')})`,
        () => resolve(),
      );
    });
  });

  return databaseSetupPromise;
}

export function getIdentities() {
  return setUpDatabase().then(() => (
    new Promise((resolve) => {
      debug('Reading identities from DB');
      const db = connect();

      db.serialize(() => {
        db.all(
          `SELECT * FROM ${TABLE_NAME} ORDER BY addedToApp DESC`,
          (_, identities) => {
            debug(`Found ${identities.length} identities.`);
            closeConnection();
            resolve(
              new Set(identities.map(id => new Identity(id))),
            );
          },
        );
      });
    })
  ));
}

export function addIdentity(armouredText) {
  return setUpDatabase().then(() => (
    new Promise((resolve) => {
      const db = connect();

      db.serialize(() => {
        const statement = db.prepare(
          `INSERT INTO ${TABLE_NAME} (guid, addedToApp, armouredText) VALUES (?, ?, ?)`,
        );

        statement.run(
          createUuid(),
          new Date().toISOString(),
          armouredText,
        );

        statement.finalize(resolve);
      });

      closeConnection();
    })
  ));
}
