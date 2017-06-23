// This import comes through `electron-prebuilt-compile`.
// eslint-disable-next-line import/no-extraneous-dependencies
import Electron from 'electron';
import fs from 'fs';
import path from 'path';
import {Database} from 'sqlite3';

const storageDirPath = path.join(
  Electron.remote.app.getPath('appData'),
  'works.pgp.pgp-works',
);

const databasePath = path.join(
  storageDirPath,
  'database',
);

let cachedConnection;

function connect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!fs.existsSync(storageDirPath)) {
    fs.mkdirSync(storageDirPath);
  }

  cachedConnection = new Database(databasePath);

  return cachedConnection;
}

function closeConnection() {
  if (!cachedConnection) {
    return;
  }

  cachedConnection.close();
  cachedConnection = null;
}

export default function executeQuery(query) {
  const dbConnection = connect();

  dbConnection.serialize(() => {
    dbConnection.run(query);
  });

  closeConnection();
}
