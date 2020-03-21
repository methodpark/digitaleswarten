import React from 'react';
import { connect } from 'react-redux';
import { AppState, Person } from '../state/state';


const Queue = (props: AppState) => {
  const {persons = []} = props;

  const renderedEntries = persons.map((person: Person)  => <li key={person.id}>{person.name}</li>);
  return (<ul>
    {renderedEntries}
  </ul>)
};

const mapStateToProps = (state: AppState) => state;

export default connect(mapStateToProps)(Queue);