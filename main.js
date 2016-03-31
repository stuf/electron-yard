/* eslint strict: 0, no-console: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 */
'use strict';

const path = require('path');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const crashReporter = electron.crashReporter;
const shell = electron.shell;

crashReporter.start();

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

let mainWindow = null;
let ppapiFlashPath = null;

if (process.platform === 'darwin') {
  ppapiFlashPath = path.join(__dirname, 'lib', 'PepperFlashPlayer.plugin');
}

app.commandLine.appendSwitch('remote-debugging-port', '8609');
app.commandLine.appendSwitch('ppapi-flash-path', ppapiFlashPath);
app.commandLine.appendSwitch('ppapi-flash-version', '21.0.0.197');

function createWindow() {
  const windowOpts = {
    width: 1400,
    height: 800,
    'web-preferences': {
      plugins: true
    }
  };

  mainWindow = new BrowserWindow(windowOpts);
  mainWindow.loadURL(`file://${__dirname}/app/app.html`);

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});

