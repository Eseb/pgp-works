// This import comes through `electron-prebuilt-compile`.
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  app,
  BrowserWindow,
} from 'electron';
import path from 'path';
import url from 'url';

function createWindow() {
  const window = new BrowserWindow({
    height: 400,
    width: 600,
    minHeight: 200,
    minWidth: 300,
  });

  window.loadURL(
    url.format({
      pathname: path.join(__dirname, 'app', 'index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  if (process.env.PGP_WORKS_DEBUG) {
    window.maximize();
    window.webContents.openDevTools();
  }
}

app.on('ready', createWindow);
app.on('all-windows-closed', () => app.quit());
