import { all, call, takeEvery, put, delay } from 'redux-saga/effects'
import { updateQueueCreator } from './queue';

// Create a queue
const CREATE_QUEUE = "@backend/CREATE_QUEUE";
interface CreateQueueAction {
  type: typeof CREATE_QUEUE;
  placeId: string;
  name: string;
}
export const createQueueCreator = (placeId: string, name: string): CreateQueueAction => ({
  type: CREATE_QUEUE,
  placeId,
  name,
})

// Adda person to a queue
const CREATE_PERSON = '@backend/CREATE_PERSON'
interface CreatePersonAction {
  type: typeof CREATE_PERSON;
  placeId: string;
  name: string;
  queueId: string;
}
export const createPersonCreator = (
  placeId: string,
  name: string,
  queueId: string
): CreatePersonAction => ({
  type: CREATE_PERSON,
  placeId,
  name,
  queueId,
})

// Fetch queue status
const FETCH_QUEUES = "@backend/FETCH_QUEUES";
type PersonDetails = "full" | "short";
interface FetchQueuesAction {
  type: typeof FETCH_QUEUES;
  placeId: string;
  personDetails: PersonDetails;
}
export const fetchQueuesCreator = (placeId: string, personDetails: PersonDetails): FetchQueuesAction => ({
  type: FETCH_QUEUES,
  placeId,
  personDetails
});

// Delete a queue
const DELETE_QUEUE = "@backend/DELETE_QUEUE";
interface DeleteQueueAction {
  type: typeof DELETE_QUEUE;
  placeId: string;
  queueId: string;
}
export const deleteQueuesCreator = (placeId: string, queueId: string): DeleteQueueAction => ({
  type: DELETE_QUEUE,
  placeId,
  queueId
});

// Call a patient
const CALL_PATIENT = "@backend/CALL_PATIENT";
interface UpdatePatientAction {
  type: typeof CALL_PATIENT | typeof REMOVE_PATIENT;
  placeId: string;
  queueId: string;
  entryId: string;
}
export const callPatientCreator = (placeId: string, queueId: string, entryId: string): UpdatePatientAction => ({
  type: CALL_PATIENT,
  placeId,
  queueId,
  entryId
});


// Remove a patient
const REMOVE_PATIENT = "@backend/REMOVE_PATIENT";
export const removePatientCreator = (placeId: string, queueId: string, entryId: string): UpdatePatientAction => ({
  type: REMOVE_PATIENT,
  placeId,
  queueId,
  entryId
});

type backendAction = CreateQueueAction |
  FetchQueuesAction |
  CreatePersonAction |
  DeleteQueueAction |
  UpdatePatientAction;

const contentTypeJsonHeader = {
  'Content-Type': 'application/json'
};

function* queueSaga(action: backendAction) {
  if (action.type === FETCH_QUEUES) {
    const response = yield call(fetch, `/places/${action.placeId}/queues?personDetails=${action.personDetails}`, {
      method: "GET",
      headers: contentTypeJsonHeader
    });
    if (response.ok) {
      const data = yield call([response, response.json]);
      put(updateQueueCreator(data));
    } else {
      console.error("Queue fetch failed: ", response);
    }
    return;
  }

  let url;
  let method = "GET";
  let body = "{}";

  if (action.type === CREATE_QUEUE) {
    url = `/places/${action.placeId}/queues`;
    method = 'POST';
    body = JSON.stringify({ queueName: action.name });
  } else if (action.type === CREATE_PERSON) {
    url = `/places/${action.placeId}/queues/${action.queueId}/entries`;
    method = 'POST';
    body = JSON.stringify({ name: action.name });
  } else if (action.type === DELETE_QUEUE) {
    url = `/places/${action.placeId}/queues/${action.queueId}`;
    method = 'DELETE';
  } else if (action.type === CALL_PATIENT) {
    url = `/places/${action.placeId}/queues/${action.queueId}/entry/${action.entryId}`;
    method = 'PUT';
    body = JSON.stringify({state: 'called'});
  } else if (action.type === REMOVE_PATIENT) {
    url = `/places/${action.placeId}/queues/${action.queueId}/entry/${action.entryId}`;
    method = 'DELETE';
  }

  if (url === undefined) {
    return;
  }

  const response = yield call(fetch, url, {
    method,
    headers: contentTypeJsonHeader,
    body
  });
  if (response.ok) {
    put(fetchQueuesCreator(action.placeId, "full"));
  } else {
    console.error(`Request for action ${action.type} failed.`);
  }
}

function* watchBackend() {
  // wait 3 seconds
  while (true) {
    yield put(fetchQueuesCreator(process.env.REACT_APP_PLACE_ID || "someplace", "short"));
    yield delay(3000);
  }
}

export function* backendSaga() {
  yield all([
    takeEvery([CREATE_QUEUE, FETCH_QUEUES, CREATE_PERSON, DELETE_QUEUE, CALL_PATIENT, REMOVE_PATIENT], queueSaga),
    watchBackend()
  ]);
}
