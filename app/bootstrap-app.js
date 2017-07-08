// This import comes through `electron-prebuilt-compile`.
// eslint-disable-next-line import/no-extraneous-dependencies
import Electron from 'electron';
import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import Application from './components/application';

const locale = Electron.remote.app.getLocale();
moment.locale(locale);

ReactDom.render(
  <Application />,
  document.getElementById('app-container'),
);
