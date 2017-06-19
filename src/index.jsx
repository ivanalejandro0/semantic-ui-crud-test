import React from 'react';
import ReactDOM from 'react-dom';
import 'metaquery';

import 'semantic-ui-css/semantic.min.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'reducers';
const store = createStore(reducer);
window._store = store; // for debugging purposes

import App from 'components/App';

const appWithRedux = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(appWithRedux, document.getElementById('app'));
