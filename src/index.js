/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { hashHistory } from 'react-router';

import configureStore, { history } from './services/store/configureStore';
import Container from './container';

require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/assets/images/loading-icon.gif';
require("babel-core/register");
require("babel-polyfill");

const store = configureStore();

let token = window.location.href.split('&token=')[1];
if(!token)
  token = window.localStorage.getItem('token');
window.localStorage.setItem('token', token)

render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Container history={history} />
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./container', () => {
    const NewRoot = require('./container').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
