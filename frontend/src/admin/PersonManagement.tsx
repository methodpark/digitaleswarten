import React from 'react';

import { InnerBox, SectionBox } from './Boxes';

import { Queue } from '../model/queue';
import { AppState } from '../state/state';
import { connect } from 'react-redux';

const PersonManagement = (props: AppState) => {

  const {queues = []} = props;

  const renderQueueOption = (queue: Queue) => (
    <option key={queue.id} value={queue.id}>Notfall</option>
  );

  const optionalIndicator = <span className="optional-star">*</span>;

  return (
    <SectionBox name="Personen anlegen">
      <div className="form-area">
        <label htmlFor="create-person-queue-name">Warteschlange: </label>
        <select id="create-person-queue-name" name="queue">
          {queues.map(renderQueueOption)}
        </select>

        <label htmlFor="create-person-person-name">Name:{optionalIndicator}</label>
        <input id="create-person-person-name" type="text" name="name" placeholder="Name" />

        <label htmlFor="create-person-free-text">Freitext:{optionalIndicator}</label>
        <textarea id="create-person-free-text" placeholder="Freitext"></textarea>

        <span className="explanation">{optionalIndicator}: optional, wird nicht auf dem server gespeichert </span>
        <div className="button-area"><button>Anlegen</button></div>
      </div>
    </SectionBox>
  );
};

const mapStateToProps = (state: AppState) => state;

export default connect(mapStateToProps)(PersonManagement);
