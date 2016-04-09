/**
 * @overview
 *  Kancolle Game Webview entry point
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/game
 */
const fs = require('fs');
const remote = require('electron').remote;

import GameDataHandler from './core/game-data-handler';
import config from './config';

window.kcscontainer = window.kcscontainer || {};

const curWindow = remote.getCurrentWindow();
curWindow.removeAllListeners();

const gameView = document.querySelector('#game');
const uiView = document.querySelector('#ui');

let initialLoad = true;
let firstGameLoad = true;
let gameUrl;
let debuggerAttached = false;

const selfwindow = window;

gameView.addEventListener('dom-ready', () => {
  const webContents = gameView.getWebContents();
  const webSession = webContents.session;

  gameView.addEventListener('close', () => {
    webContents.debugger.sendCommand('Network.disable');
  });

  // @todo(stuf): refactor the debugger logic to be more consistent
  if (!debuggerAttached) {
    try {
      webContents.debugger.attach('1.1');
      debuggerAttached = true;
    }
    catch (err) {
      console.log('Debugger attach failed : ', err);
    }

    webContents.debugger.on('detach', () => {
      debuggerAttached = false;
    });

    webContents.debugger.on('message', new GameDataHandler(webContents));
    webContents.debugger.sendCommand('Network.enable');

    webSession.webRequest.onBeforeRequest((details, callback) => {
      const cancel = config.gameSwfPrefix.test(details.url) && firstGameLoad;
      callback({ cancel });

      if (cancel) {
        console.log(`Found game SWF: ${details.url}`);
        gameUrl = details.url;
        firstGameLoad = false;
        webContents.loadURL(gameUrl);

        selfwindow.kcscontainer.webContents = webContents;
      }
    });
  }

  webContents.executeJavaScript([
    'document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/";',
    'document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/";',
    'document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/";',
    'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/";',
    'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/";',
    'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/";'
  ].join('\n'));
});
