import {Set} from 'immutable';
import createUuid from 'uuid/v4';
import debugLib from 'debug';
import {
  connect,
  closeConnection,
  executeQuery,
} from './storage-manager';
import Identity from './identity';

const debug = debugLib('pgp-works:identity-store');

const TABLE_NAME = 'certs';
// Map column name to its type.
const TABLE_SCHEMA = {
  guid: 'VARCHAR(36) PRIMARY KEY',
  added: 'TEXT',
  armouredContents: 'TEXT',
};

export default function openDatabase() {
  const schemaDefinitions = Object.keys(TABLE_SCHEMA).map(columnName =>
    `${columnName} ${TABLE_SCHEMA[columnName]}`,
  );

  executeQuery(
    `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (${schemaDefinitions.join(', ')})`,
  );
}

export function getIdentities() {
  return new Promise((resolve) => {
    debug('Reading identities from DB');
    const db = connect();

    db.serialize(() => {
      db.all(
        `SELECT * FROM ${TABLE_NAME} ORDER BY added DESC`,
        (_, identities) => {
          debug(`Found ${identities.length} identities.`);
          closeConnection();
          resolve(new OrderedSet(identities));
        },
      );
    });
  });
}

export function addIdentity(armouredText) {
  const db = connect();

  db.serialize(() => {
    const statement = db.prepare(
      `INSERT INTO ${TABLE_NAME} (guid, added, armouredContents) VALUES (?, ?, ?)`,
    );

    statement.run(
      createUuid(),
      new Date().toISOString(),
      armouredText,
    );

    statement.finalize();
  });

  closeConnection();
}

openDatabase();
