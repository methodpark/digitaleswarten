import React from 'react';
import { Queue as QueueModel } from '../model/queue';
import { Person } from '../model/person';
import { AppState } from '../state/state';
import { connect } from 'react-redux';

const Queue = (props: {queue: QueueModel}) => {
  const {entries = []} = props.queue;

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

  return (<ul>
    { personEntries.length !== 0 ? personEntries : 'Diese Warteliste ist leer.' }
  </ul>);
};

const Queues = (props: AppState) => {
  const {queues = []} = props;

  return (
    <section>
      <h2>Warteschlangen</h2>

      {queues.map(queue => <Queue queue={queue}></Queue>)}
    </section>
  )
}

const mapStateToProps = (state: AppState) => state;

export default connect(mapStateToProps)(Queues);
