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
      <h1>Warte Frei</h1>
      <div className="admin-view">
        <main>
          <PersonManagement />
          <Queues />
        </main>
        <aside>
          <QueueOverview />
          <QueueManagement />
        </aside>
      </div>
    </>
  );
}

export default connect()(App);
