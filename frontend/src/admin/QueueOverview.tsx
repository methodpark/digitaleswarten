import React from 'react';

import { Queue } from '../model/queue';
import { AppState } from '../state/state';
import { connect } from 'react-redux';

const QueuesOverview = (props: AppState) => {

  const {queues = []} = props;

  const renderSubArea = (queue: Queue) => (
    <div key={queue.id} className="sub-area">
      <span className="area-heading">{queue.name}</span>

      Es warten derzeit {queue.entries.length} Personen.
    </div>
  );

  return (
    <section>
      <h2>Warteschlangen-Übersicht</h2>

      {queues.map(renderSubArea)}
    </section>
    );
}

const mapStateToProps = (state: AppState) => state;

export default connect(mapStateToProps)(QueuesOverview);
