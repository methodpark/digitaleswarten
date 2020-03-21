import './index.css';

import * as serviceWorker from './serviceWorker';

import { applyMiddleware, createStore } from 'redux';

import App from './App';
import { AppState } from './state/state';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { backendSaga } from './state/backend';
import createSagaMiddleware from 'redux-saga';

const backendMiddleware = createSagaMiddleware();

function fakeReducer(): AppState {
  return {
    queues: [{
      id: "foo",
      name: "Notfall",
      entries: [{
        id: "abc",
        name: "Hans Wurst",
        ticketNumber: 1
      }, {
        id: "123",
        name: "Tobias Schaefer",
        ticketNumber: 999
      }]
    }, {
      id: "bar",
      name: "Schnupfen",
      entries: [{
        id: "def",
        name: "Frank Blendinger",
        ticketNumber: 2
      }, {
        id: "456",
        name: "Tilman Adler",
        ticketNumber: 5
      }]
    }]
  };
}

const store = createStore(fakeReducer, applyMiddleware(backendMiddleware));

backendMiddleware.run(backendSaga);

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
