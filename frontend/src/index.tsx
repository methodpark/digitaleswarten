import './index.css';

import * as serviceWorker from './serviceWorker';

import { applyMiddleware, createStore } from 'redux';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { backendSaga } from './state/backend';
import createSagaMiddleware from 'redux-saga';
import { queueReducer } from './state/queue';
import { PatientWelcome } from './patient/PatientWelcome';
import { QueueBoard } from './patient/QueueBoard';

const backendMiddleware = createSagaMiddleware();

const store = createStore(queueReducer, applyMiddleware(backendMiddleware));

backendMiddleware.run(backendSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/:placeId/admin" component={App} />
        <Route path="/queues" component={QueueBoard} />
        <Route path="/" component={PatientWelcome} />
      </Switch>
    </Router>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
