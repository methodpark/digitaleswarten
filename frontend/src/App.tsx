import './styles/App.css';

import React from 'react';
import { connect } from 'react-redux';

import PersonManagement from './admin/PersonManagement';
import Queues from './admin/Queues';
import QueueOverview from './admin/QueueOverview';
import QueueManagement from './admin/QueueManagement';
import SelfRefreshingQueues from './SelfRefreshingQueues';

function App(props: any) {
  return (
    <>
      <h1>Warte Frei</h1>
      <div className="admin-view">
        <main>
          <SelfRefreshingQueues placeId={props.match.params.placeId} personDetails="full" />
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
