// This import comes through `electron-prebuilt-compile`.
// eslint-disable-next-line import/no-extraneous-dependencies
import {BrowserWindow} from 'electron';

export function isInDebugMode() {
  return (
    process.env.DEBUG &&
    process.env.DEBUG.indexOf('pgp-works') !== -1
  );
}

export function loadDevTools() {
  BrowserWindow.addDevToolsExtension('/Users/sbacanu/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.4.0_0');
  BrowserWindow.addDevToolsExtension('/Users/sbacanu/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.1_0');
}
