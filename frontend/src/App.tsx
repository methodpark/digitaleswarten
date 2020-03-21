import './App.css';

import React from 'react';
import { connect } from 'react-redux';

import PersonManagement from './admin/PersonManagement';
import Queues from './admin/Queues';
import QueueOverview from './admin/QueueOverview';
import QueueManagement from './admin/QueueManagement';

function App() {
  return (
    <>
      <main>
        <PersonManagement />
        <Queues />
      </main>
      <aside>
        <QueueOverview />
        <QueueManagement />
      </aside>
    </>
  );
}

export default connect()(App);
