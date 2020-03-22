import React from 'react';
import { Queue as QueueModel } from '../model/queue';
import { Person } from '../model/person';
import { AppState } from '../state/state';
import { connect, DispatchProp } from 'react-redux';
import { SectionBox, InnerBox } from './Boxes';
import { useParams } from 'react-router-dom';
import { FetchQueuesAction, fetchQueuesCreator } from '../state/backend';

const Queue = (props: {queue: QueueModel}) => {
  const {entries = [], name=""} = props.queue;

  const buttonArea = () => (<div>
    <button>Aufrufen</button>
    <button>Löschen, ohne aufzurufen</button>
  </div>);

  const personEntries = entries.map((person: Person) => (
    <li key={person.id}>
      {person.name}
      {buttonArea()}
    </li>
  ));

  return (
    <InnerBox name={name}>
      <ul className="queue-list">
        { personEntries.length !== 0 ? personEntries : 'Diese Warteliste ist leer.' }
      </ul>
    </InnerBox>
  );
};

const Queues = (props: AppState) => {
  const {queues = []} = props;

  return (
    <SectionBox name="Warteschlangen">
      {queues.map(queue => <Queue key={queue.id} queue={queue}></Queue>)}
    </SectionBox>
  )
}

const SelfRefreshingQueues = (props: AppState & DispatchProp<FetchQueuesAction>) => {
  const locationParams = useParams() as {placeId: string};
  const dispatchFetch = () => {
    props.dispatch(fetchQueuesCreator(locationParams.placeId, "full"));
    setTimeout(dispatchFetch, 3000);
  };

  dispatchFetch();

  return <Queues {...props} />;
}

const mapStateToProps = (state: AppState) => state;

export default connect(mapStateToProps)(SelfRefreshingQueues);
