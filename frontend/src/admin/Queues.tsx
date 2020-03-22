import React from 'react';
import { Queue as QueueModel } from '../model/queue';
import { Person } from '../model/person';
import { AppState } from '../state/state';
import { connect, DispatchProp } from 'react-redux';
import { SectionBox, InnerBox } from './Boxes';
import { UpdatePersonAction, callPersonCreator, removePersonCreator } from '../state/backend'

const PersonComponent = (props: {queueId: string, person: Person} & DispatchProp<UpdatePersonAction>) => {

  const { person, queueId } = props;

  const callPerson = () => props.dispatch(callPersonCreator('warmliebedeuten', queueId, person.id));
  const deletePerson = () => props.dispatch(removePersonCreator('warmliebedeuten', queueId, person.id));

  const buttonArea = () => (<div>
    <button onClick={callPerson}>Aufrufen</button>
    <button onClick={deletePerson}>Löschen, ohne aufzurufen</button>
  </div>);

  return (
    <li key={person.id}>
      {person.name}
      {buttonArea()}
    </li>
  );
}

const QueueComponent = (props: {queue: QueueModel} & DispatchProp<UpdatePersonAction>) => {
  const { queue, dispatch } = props;
  const { entries = [], name="", id } = queue;

  const personEntries = entries.map((person: Person) => <PersonComponent {...{ queueId: id, person, dispatch }} />);

  return (
    <InnerBox name={name}>
      <ul className="queue-list">
        { personEntries.length !== 0 ? personEntries : 'Diese Warteliste ist leer.' }
      </ul>
    </InnerBox>
  );
};

const Queues = (props: AppState & DispatchProp<UpdatePersonAction>) => {
  const {queues = [], dispatch} = props;

  return (
    <SectionBox name="Warteschlangen">
      {queues.map(queue => <QueueComponent key={queue.id} {...{queue, dispatch}} />)}
    </SectionBox>
  )
}

const mapStateToProps = (state: AppState) => state;

export default connect(mapStateToProps)(Queues);
