import React from 'react';
import { Queue as QueueModel } from '../model/queue';
import { Person } from '../model/person';


const Queue = (props: {queue: QueueModel}) => {
  const {entries = []} = props.queue;

  const renderedEntries = entries.map((person: Person)  => (
    <li key={person.id}>{person.name}</li>
  ));

  return (<ul>
    {renderedEntries}
  </ul>);
};

export default Queue;
