import './App.css';

import React from 'react';
import { connect } from 'react-redux';
import { createQueueCreator } from './state/backend';

function App(props: any) {
  return (
    <div className="App">
      <button onClick={() => props.dispatch(createQueueCreator("placeid", "Notfall"))}>Create "Notfall" Queue</button>
    </div>
  );
}

export default connect()(App);
