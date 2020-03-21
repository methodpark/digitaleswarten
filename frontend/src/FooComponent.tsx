import './App.css';

import React from 'react';
import { connect } from 'react-redux';

function FooComponent(props: any) {
  return (
    <div className="App">
      <span>You are visiting the admin page of {props.match.url}</span>
    </div>
  );
}

export default connect()(FooComponent);
