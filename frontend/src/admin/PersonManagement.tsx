import React from 'react'

import { AppState } from '../state/state'
import { Queue } from '../model/queue'
import { SectionBox } from './Boxes'
import { connect, DispatchProp } from 'react-redux'
import { createPersonCreator, CreatePersonAction } from '../state/backend'
import { useParams } from 'react-router-dom'

const PersonManagement = (props: AppState & DispatchProp<CreatePersonAction>) => {
  const { queues = [] } = props

  const renderQueueOption = (queue: Queue) => (
    <option key={queue.id} value={queue.id}>
      {queue.name}
    </option>
  )

  const nameRef = React.createRef<HTMLInputElement>();
  const queueRef = React.createRef<HTMLSelectElement>();
  const locationParams = useParams() as {placeId: string};

  const createPerson = () => {
    const name = nameRef.current?.value;
    const queueId = queueRef.current?.value;

    if(nameRef.current === null || name === undefined || name === '' || queueId === undefined){
      return;
    }

    props.dispatch(createPersonCreator(locationParams.placeId, name, queueId));
    nameRef.current.name = '';

  }

  return (
    <SectionBox name="Personen anlegen">
      <div className="form-area">
        <label htmlFor="create-person-queue-name">Warteschlange: </label>
        <select
          id="create-person-queue-name"
          name="queue"
          ref={queueRef}
        >
          {queues.map(renderQueueOption)}
        </select>

        <label htmlFor="create-person-person-name">
          Name:
        </label>
        <input
          id="create-person-person-name"
          type="text"
          name="name"
          placeholder="Name"
          ref={nameRef}
        />
        <div className="button-area">
          <button
            onClick={createPerson}
          >
            Anlegen
          </button>
        </div>
      </div>
    </SectionBox>
  )
}

const mapStateToProps = (state: AppState) => state

export default connect(mapStateToProps)(PersonManagement)
