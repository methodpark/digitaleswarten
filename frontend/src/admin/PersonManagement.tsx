import React, { useState } from 'react'

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
      Notfall
    </option>
  )

  const [selectedQueueId, setSelectedQueueId] = useState(
    queues.length !== 0 ? queues[0].id : ''
  )
  const [personName, setPersonName] = useState('')
  const optionalIndicator = <span className="optional-star">*</span>
  const locationParams = useParams() as {placeId: string};

  return (
    <SectionBox name="Personen anlegen">
      <div className="form-area">
        <label htmlFor="create-person-queue-name">Warteschlange: </label>
        <select
          id="create-person-queue-name"
          name="queue"
          onChange={ev => setSelectedQueueId(ev.target.value)}
        >
          {queues.map(renderQueueOption)}
        </select>

        <label htmlFor="create-person-person-name">
          Name:{optionalIndicator}
        </label>
        <input
          id="create-person-person-name"
          type="text"
          name="name"
          placeholder="Name"
          onChange={ev => setPersonName(ev.target.value)}
        />

        <label htmlFor="create-person-free-text">
          Freitext:{optionalIndicator}
        </label>
        <textarea
          id="create-person-free-text"
          placeholder="Freitext"
        ></textarea>

        <span className="explanation">
          {optionalIndicator}: optional, wird nicht auf dem server gespeichert{' '}
        </span>
        <div className="button-area">
          <button
            onClick={() =>
              props.dispatch(
                createPersonCreator(locationParams.placeId, personName, selectedQueueId)
              )
            }
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
