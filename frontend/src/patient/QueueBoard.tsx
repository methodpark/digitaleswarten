import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../state/state';
import { Queue } from '../model/queue';
import { Person } from '../model/person';
import icon from '../img/arzt-icon.png';

export function QueueBoard(props: AppState) {
  console.log(props);
  const { queues = [
    {
      id: 'queue1', name: 'notfall', entries: [
        { name: "Heiko", id: 'notfall1', ticketNumber: 1 },
        { name: "Lena", id: 'notfall2', ticketNumber: 2 },
        { name: "SuperLongNameWTFIsHappeningHere", id: 'notfall3', ticketNumber: 3 }
      ]
    },
    {
      id: 'queue2', name: 'corona', entries: [
        { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        // { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        { id: 'corona1', name: 'Tobias', ticketNumber: 1 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
        { id: 'corona2', name: 'Franz', ticketNumber: 2 },
      ]
    }
  ] } = props;



  return (
    <div className="queueboard-wrapper">
        {queues.map((queue: Queue) => {
          return queue.entries.map((entry: Person) => {
            return (
            <div key={entry.id} className="queueboard-patient-entry">{entry.id}
              <img alt="An icon showing a patient" src={icon}></img>
            </div>
            )
          })
        })}
    </div>
  );
}


const mapStateToProps = (state: AppState) => state;

export default connect(mapStateToProps)(QueueBoard);