import React, {Fragment} from 'react';

import { InnerBox, SectionBox } from './Boxes';

import { Queue } from '../model/queue';
import { AppState } from '../state/state';
import { createQueueCreator } from '../state/backend';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const QueuesManagement = (props: AppState & { dispatch: any }) => {

  const {queues = []} = props;

  const renderQueueDeleteLine = (queue: Queue) => (
    <Fragment key={queue.id}><span>{queue.name}</span> <button>Löschen</button></Fragment>
  );

  const locationParams = useParams() as {placeId: string};

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
      <button onClick={() => props.dispatch(createQueueCreator(locationParams.placeId, "CoViD"))}>Create "CoViD" Queue</button>
    </SectionBox>
  );
};

const mapStateToProps = (state: AppState) => state;

export default connect(mapStateToProps)(QueuesManagement);
