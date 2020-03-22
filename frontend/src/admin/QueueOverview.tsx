import React from 'react';

import { InnerBox, SectionBox } from './Boxes';

import { Queue } from '../model/queue';
import { AppState } from '../state/state';
import { connect } from 'react-redux';

const QueuesOverview = (props: AppState) => {

  const {queues = []} = props;

  const renderIndividualQueues = (queue: Queue) => (
    <InnerBox name={queue.name} key={queue.id}>
      Es warten derzeit {queue.entries.length} Personen.
    </InnerBox>
  );

  return (
    <SectionBox inactive={queues.length === 0} name="Warteschlangen-Übersicht">
      {queues.map(renderIndividualQueues)}
    </SectionBox>
  );
};

const mapStateToProps = (state: AppState) => state;

export default connect(mapStateToProps)(QueuesOverview);
