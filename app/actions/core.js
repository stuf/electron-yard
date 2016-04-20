/// <reference path="../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../lib/typedefs/dockyard.d.ts" />
/**
 * @overview
 *  Core game -related actions
 *
 * @since 0.2.0
 * @version 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/actions/core
 */
import { createAction } from 'redux-actions';

/** @type {string} Register a reference to the <webview /> holding the game SWF */
export const REGISTER_GAME_VIEW = 'REGISTER_GAME_VIEW';
export const UPDATE_CONFIGURATION = 'UPDATE_CONFIGURATION';
export const TAKE_SCREENSHOT = 'TAKE_SCREENSHOT';

/**
 * Action Creators
 */
export const takeScreenshot = createAction(TAKE_SCREENSHOT, (view) => {
  const browserWindow = require('electron').remote.getCurrentWindow();
  const gameViewRect = view.getBoundingClientRect();
  const filename = `/Users/stuf/electron_${+(new Date())}.png`;
  let error = null;

  browserWindow.capturePage({
    x: gameViewRect.left,
    y: gameViewRect.top,
    width: gameViewRect.width,
    height: gameViewRect.height
  }, (image) => {
    const fs = require('fs');
    fs.writeFile(filename, image.toPng(), (err) => {
      if (err) error = err;
      console.log(`Screenshot saved as: ${filename}`);
    });
  });

  return { error, filename };
});

export const registerGameView = createAction(REGISTER_GAME_VIEW, webview => webview);