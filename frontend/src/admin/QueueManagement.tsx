import React, {Fragment} from 'react';

import { InnerBox, SectionBox } from './Boxes';

import { Queue } from '../model/queue';
import { AppState } from '../state/state';
import { createQueueCreator, deleteQueuesCreator, CreateQueueAction, DeleteQueueAction } from '../state/backend';
import { connect, DispatchProp } from 'react-redux';
import { useParams } from 'react-router-dom';

const QueueCreateBox = (props: AppState & DispatchProp<CreateQueueAction>) => {

  const locationParams = useParams() as {placeId: string};
  const nameInputRef = React.createRef<HTMLInputElement>();

  const createNewQueue = () => {
    const currentValue = nameInputRef.current?.value;
    if(currentValue === undefined) {
      return;
    }

    props.dispatch(createQueueCreator(locationParams.placeId, currentValue));
  }

  return (
    <InnerBox name="Warteschlange anlegen">
      <label htmlFor="create-queue-queue-name">Name:</label>
      <input id="create-queue-queue-name" placeholder="Name" ref={nameInputRef} />

      <div className="button-area">
        <button onClick={createNewQueue}>anlegen</button>
      </div>
    </InnerBox>
  );
}

const QueueDeleteBox = (props: AppState &  DispatchProp<DeleteQueueAction>) => {

  const locationParams = useParams() as {placeId: string};
  const {queues = []} = props;

  const deleteQueue = (queue: Queue) => {
    props.dispatch(deleteQueuesCreator(locationParams.placeId, queue.id));
  }

  const renderQueueDeleteLine = (queue: Queue) => (
    <Fragment key={queue.id}>
      <span>{queue.name}</span>
      <button onClick={() => deleteQueue(queue)}>Löschen</button>
    </Fragment>
  );


  return (
    <InnerBox name="Warteschlange löschen">
      <div className="form-area">
        {queues.map(renderQueueDeleteLine)}
      </div>
    </InnerBox>
  );
}

const QueuesManagement = (props: AppState & { dispatch: any }) => {
  return (
    <SectionBox name="Warteschlangen-Übersicht">
      <QueueCreateBox {...props}></QueueCreateBox>
      <QueueDeleteBox {...props}></QueueDeleteBox>
    </SectionBox>
  );
};

const mapStateToProps = (state: AppState) => state;

export default connect(mapStateToProps)(QueuesManagement);
