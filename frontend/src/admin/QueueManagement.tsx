import React from 'react';

import { InnerBox, SectionBox } from './Boxes';

import { Queue } from '../model/queue';
import { AppState } from '../state/state';
import { connect } from 'react-redux';

const QueuesManagement = (props: AppState) => {

  const {queues = []} = props;

  const renderQueueDeleteLine = (queue: Queue) => (
    <><span>{queue.name}</span> <button>Löschen</button></>
  );

  return (
    <SectionBox name="Warteschlangen-Übersicht">

      <InnerBox name="Warteschlange anlegen">
        <label htmlFor="create-queue-queue-name">Name:</label>
        <input id="create-queue-queue-name" placeholder="Name" />

        <div className="button-area">
          <button>anlegen</button>
        </div>
      </InnerBox>

      <InnerBox name="Warteschlange löschen">
        <div className="form-area">
          {queues.map(renderQueueDeleteLine)}
        </div>
      </InnerBox>
    </SectionBox>
  );
};

const mapStateToProps = (state: AppState) => state;

export default connect(mapStateToProps)(QueuesManagement);
