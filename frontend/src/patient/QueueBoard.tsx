import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../state/state';
import { Queue } from '../model/queue';
import { Person } from '../model/person';
import SelfRefreshingQueues from '../SelfRefreshingQueues';

import '../styles/QueueBoard.css'

export function QueueBoard(props: any) {
  const { queues = [] } = props;

  if (queues.length < 1) {
    return (
      <div className="queueboard-wrapper">
        <div className="queueboard-patient-entry">
          In diesem Wartebereich gibt es keine Warteschlangen. Haben Sie vielleicht die falsche Wartebereichsnummer gewählt?
        </div>
      </div>
    );
  }

  return (
    <>
    <h1>Wartebereich {props.placeId}</h1>

    <p>
      Sie befinden Sich im Wartebereich mit der Nummer <b>{props.placeId}</b>.<br/>
      Sie finden Ihre Ticketnummer in einem der unten stehenden Warteschlangen.
      Wenn Ihr Ticket aufgerufen wird, wird es farblich markiert.</p>

    <div className="queueboard-wrapper">
      {queues.map((queue: Queue) => {
        return (
          <section className="queue-wrapper">
            <header className="queue-header">Warteschlange <br/> {queue.name}</header>
            <div className="ticket-container">
            {queue.entries.map((entry: Person) => {
              let patientMessage = <div>&nbsp;</div>;
              if(entry.state === "called") {
                patientMessage = <div>Sie wurden aufgerufen.</div>;
              }
              return (
                <div key={entry.id} className={"queueboard-patient-entry " + (entry.state === "called" ? "called" : "")}>
                  <span>Ticketnummer: <span className="ticket-number">{entry.ticketNumber}</span></span>
                  {patientMessage}
                </div>
              )
            })}
            </div>
          </section>
        )
      })}
    </div>
    <footer className="queue-footer">
      <a href={process.env.PUBLIC_URL + '/impressum.html'}>Impressum</a>
    </footer>
    </>
  );
}

const mapStateToProps = (state: AppState) => state;
const ConnectedQueueBoard = connect(mapStateToProps)(QueueBoard);

export const SelfUpdatingQueueBoard = (props: any) => {
  return <>
    <SelfRefreshingQueues personDetails="short" placeId={props.match.params.placeNumber} />
    <ConnectedQueueBoard placeId={props.match.params.placeNumber} />
  </>;
}

export default SelfUpdatingQueueBoard;
