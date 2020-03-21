import React from 'react';
import { Queue } from '../model/queue';
import { Person } from '../model/person';


const Queue = (props: {queue: Queue}) => {
  const {entries = []} = props.queue;

  const renderedEntries = entries.map((person: Person)  => (
    <li key={person.id}>{person.name}</li>
  ));

  return (<ul>
    {renderedEntries}
  </ul>);
};

export default Queue;
