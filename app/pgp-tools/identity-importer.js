// This import comes through `electron-prebuilt-compile`.
// eslint-disable-next-line import/no-extraneous-dependencies
import electron from 'electron';
import {readFileSync} from 'fs';
import {key as openpgpKey} from 'openpgp';

const {dialog} = electron.remote;

export class ImportError extends Error {

}

export function containsPublicKey(armouredContents) {
  let key;
  try {
    key = openpgpKey.readArmored(armouredContents);
  } catch (exception) {
    return false;
  }

  return (
    key.keys.length > 0 &&
    key.keys[0].isPublic()
  );
}

export function importFile() {
  const importedFiles = dialog.showOpenDialog({
    properties: ['openFile'],
  });

  // Dialog was cancelled.
  if (!importedFiles) {
    return null;
  }

  if (importedFiles.length === 0) {
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
    throw new ImportError('No key was found in the selected file.');
  }

  if (!fileContainsKey) {
    throw new ImportError('No key was found in the selected file.');
  }

  return armouredContents;
}
