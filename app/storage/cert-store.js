import {
  executeQuery,
  storagePath,
} from './storage-manager';

const TABLE_NAME = 'certs';
// Map column name to its type.
const TABLE_SCHEMA = {
  guid: 'VARCHAR(32) PRIMARY KEY',
  added: 'TEXT',
  armouredContents: 'TEXT',
};

export function openDatabase() {
  const schemaDefinitions = Object.keys(TABLE_SCHEMA).map(columnName =>
    `${columnName} ${TABLE_SCHEMA[columnName]}`
  );

  executeQuery(
    `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (${schemaDefinitions.join(', ')})`
  );
}
