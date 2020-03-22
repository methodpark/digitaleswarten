import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../state/state';
import { Queue } from '../model/queue';
import { Person } from '../model/person';
import icon from '../img/arzt-icon.png';
import SelfRefreshingQueues from '../SelfRefreshingQueues';

export function QueueBoard(props: any) {
  const { queues = [] } = props;

  if (queues.length < 1) {
    return (
      <div className="queueboard-wrapper">
        <div className="queueboard-patient-entry">
          Queues are empty
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="queueboard-header">
      <div>Willkommen bei digitales:warten</div>
      <div>Sie befinden sich im Wartebereich von {props.placeId.charAt(0).toUpperCase() + props.placeId.slice(1)}</div>
    </div>
    <div className="queueboard-wrapper">
      {queues.map((queue: Queue) => {
        return (
          <div className="queue-wrapper">
            <div className="queue-header">{queue.name}</div>
            {queue.entries.map((entry: Person) => {
              let patientMessage = <></>;
              if(entry.state === "called") {
                patientMessage = <div>Sie wurden aufgerufen.</div>;
              }
              return (
                <div key={entry.id} className={"queueboard-patient-entry " + (entry.state === "called" ? "called" : "")}>{entry.ticketNumber}
                  {patientMessage}
                  <img alt="An icon showing a patient" src={icon}></img>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
    </>
  );
}

const mapStateToProps = (state: AppState) => state;
const ConnectedQueueBoard = connect(mapStateToProps)(QueueBoard);

export const SelfUpdatingQueueBoard = (props: any) => {
  return <>
    <SelfRefreshingQueues personDetails="short" placeId={props.match.params.placeId} />
    <ConnectedQueueBoard placeId={props.match.params.placeId} />
  </>;
}

export default SelfUpdatingQueueBoard;