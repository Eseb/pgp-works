// This import comes through `electron-prebuilt-compile`.
// eslint-disable-next-line import/no-extraneous-dependencies
import electron from 'electron';
import debugLib from 'debug';
import {readFileSync} from 'fs';
import {key as openpgpKey} from 'openpgp';

const debug = debugLib('pgp-works:identity-importer');
const {dialog} = electron.remote;

export class ImportError extends Error {

}

export function containsPublicKey(armouredContents) {
  debug('Asserting whether armoured text contains public key.');
  let key;
  try {
    key = openpgpKey.readArmored(armouredContents);
  } catch (exception) {
    debug('There was an error parsing the armoured text.');
    debug(exception);
    return false;
  }

  debug(`Number of keys found = ${key.keys.length}`);

  return (
    key.keys.length > 0 &&
    key.keys[0].isPublic()
  );
}

export function importFile() {
  debug('Starting file import.');

  const importedFiles = dialog.showOpenDialog({
    properties: ['openFile'],
  });

  if (!importedFiles) {
    debug('File import cancelled.');
    return null;
  }

  if (importedFiles.length === 0) {
    debug('No files were selected.');
    throw new ImportError('No valid file was selected.');
  }

  let armouredContents;
  let fileContainsKey;
  try {
    armouredContents = readFileSync(importedFiles[0], {
      encoding: 'ascii',
    });

    fileContainsKey = containsPublicKey(armouredContents);
  } catch (exception) {
    debug(`Could not read key in file ${importedFiles[0]}.`);
    debug(exception);
    throw new ImportError('No key was found in the selected file.');
  }

  if (!fileContainsKey) {
    debug('No public key was found in the file.');
    throw new ImportError('No key was found in the selected file.');
  }

  debug('Successfully read imported key.');

  return armouredContents;
}
