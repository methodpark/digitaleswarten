import './styles/Admin.css';

import React from 'react';
import { connect, DispatchProp } from 'react-redux';

import PersonManagement from './admin/PersonManagement';
import Queues from './admin/Queues';
import QueueOverview from './admin/QueueOverview';
import QueueManagement from './admin/QueueManagement';
import SelfRefreshingQueues from './SelfRefreshingQueues';
import PlaceDetails from './admin/PlaceDetails';
import { AppState } from './state/state';
import { FetchPlaceDetailsAction, fetchPlaceDetailsCreator } from './state/backend';

type AdminProps = AppState & DispatchProp<FetchPlaceDetailsAction> & {match: any};

class Admin extends React.Component<AdminProps> {

  componentDidMount() {
    console.log('dispatching');
    this.props.dispatch(fetchPlaceDetailsCreator(this.props.match.params.placeId));
  }

  render() {
      return (
      <>
        <h1>Warte Frei</h1>
        <div className="admin-view">
          <main>
            <SelfRefreshingQueues placeId={this.props.match.params.placeId} personDetails="full" />
            <PersonManagement />
            <Queues />
          </main>
          <aside>
            <PlaceDetails></PlaceDetails>
            <QueueOverview />
            <QueueManagement />
          </aside>
        </div>
      </>
    );
  }
}

export default connect()(Admin);
