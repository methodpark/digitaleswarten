import { all, call, takeEvery, put, delay } from 'redux-saga/effects'
import { updateQueueCreator } from './queue';

const CREATE_QUEUE = "@backend/CREATE_QUEUE";
interface CreateQueueAction {
  type: "@backend/CREATE_QUEUE";
  placeId: string;
  name: string;
}
export const createQueueCreator = (placeId: string, name: string): CreateQueueAction => ({
  type: CREATE_QUEUE,
  placeId,
  name,
})

const CREATE_PERSON = '@backend/CREATE_PERSON'
interface CreatePersonAction {
  type: "@backend/CREATE_PERSON";
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

const FETCH_QUEUES = "@backend/FETCH_QUEUES";
type PersonDetails = "full" | "short";
interface FetchQueuesAction {
  type: "@backend/FETCH_QUEUES";
  placeId: string;
  personDetails: PersonDetails;
}
export const fetchQueuesCreator = (placeId: string, personDetails: PersonDetails): FetchQueuesAction => ({
  type: FETCH_QUEUES,
  placeId,
  personDetails
});

type backendAction = CreateQueueAction | FetchQueuesAction | CreatePersonAction;

function* queueSaga(action: backendAction) {
  if (action.type === CREATE_QUEUE) {
    const response = yield call(fetch, `/places/${action.placeId}/queues`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ queueName: action.name })
    });
    if (response.ok) {
      console.log("Queue created, response: ", response);
    } else {
      console.error("Queue creation failed: ", response);
    }
  } else if (action.type === FETCH_QUEUES) {
    const response = yield call(fetch, `/places/${action.placeId}/queues?personDetails=${action.personDetails}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = yield call([response, response.json]);
      put(updateQueueCreator(data));
    } else {
      console.error("Queue fetch failed: ", response);
    }
  } else if (action.type === CREATE_PERSON) {
    const response = yield call(
      fetch,
      `/places/${action.placeId}/queues/${action.queueId}/entries`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: action.name }),
      }
    )
    if (response.ok) {
      console.log('Person created, response: ', response)
    } else {
      console.error('Person creation failed: ', response)
    }
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
    takeEvery([CREATE_QUEUE, FETCH_QUEUES, CREATE_PERSON], queueSaga),
    watchBackend()
  ]);
}
