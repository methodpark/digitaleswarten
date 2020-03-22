import React from 'react';
import { Queue as QueueModel } from '../model/queue';
import { Person } from '../model/person';
import { AppState } from '../state/state';
import { connect, DispatchProp } from 'react-redux';
import { SectionBox, InnerBox } from './Boxes';
import { UpdatePersonAction, callPersonCreator, removePersonCreator } from '../state/backend'
import { useParams } from 'react-router-dom';

const PersonComponent = (props: {queueId: string, person: Person, areaNumber: number} & DispatchProp<UpdatePersonAction>) => {

  const { person, queueId, areaNumber } = props;
  const locationParams = useParams() as {placeId: string};

  const callPerson = () => props.dispatch(callPersonCreator(locationParams.placeId, queueId, person.id));
  const deletePerson = () => props.dispatch(removePersonCreator(locationParams.placeId, queueId, person.id));

  const buttonArea = () => (<div>
    <button onClick={callPerson}>Aufrufen</button>
    <button onClick={deletePerson}>Löschen, ohne aufzurufen</button>
  </div>);

  return (
    <li key={person.id}>
      <span>
        <b>{person.name}</b> {person.state === 'called' ? '(aufgerufen)' : ''} <br/>
        (Wartebereich: {areaNumber}; Ticket-Nummer: {person.ticketNumber})
      </span>
      {buttonArea()}
    </li>
  );
}

const QueueComponent = (props: {queue: QueueModel, areaNumber: number} & DispatchProp<UpdatePersonAction>) => {
  const { queue, dispatch, areaNumber } = props;
  const { entries = [], name="", id } = queue;

  const personEntries = entries.map((person: Person) => <PersonComponent key={id} {...{ queueId: id, person, dispatch, areaNumber }} />);

  return (
    <InnerBox name={name}>
      <ul className="queue-list">
        { personEntries.length !== 0 ? personEntries : 'Diese Warteliste ist leer.' }
      </ul>
    </InnerBox>
  );
};

const Queues = (props: AppState & DispatchProp<UpdatePersonAction>) => {
  const {queues = [], placeDetails, dispatch} = props;
  const { publicId } = placeDetails;

  return (
    <SectionBox inactive={queues.length === 0} name="Warteschlangen">
      <p>Teilen Sie Ihren wartenden Ihre Wartebereichsnummer <b>({publicId})</b> und ihre <b>Ticket-Nummer</b> mit. <br />
      Die Wartebereichsnummer identifiziert Ihren Wartebereich, ohne weitere Informationen Preis zu geben.<br />
      Die Wartenden sind an der Reihe, wenn ihre Ticket-Nummer aufgerufen wird.</p>
      {queues.map(queue => <QueueComponent key={queue.id} {...{queue, dispatch, areaNumber: publicId}} />)}
    </SectionBox>
  )
}

const mapStateToProps = (state: AppState) => state;

export default connect(mapStateToProps)(Queues);
