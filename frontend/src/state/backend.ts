import { all, call, takeEvery } from 'redux-saga/effects'

const CREATE_QUEUE = "@backend/CREATE_QUEUE";

export const createQueueCreator = (placeId: string, name: string) => ({
  type: CREATE_QUEUE,
  placeId,
  name
});

function* queueSaga(action: any) {
  if (action.type === CREATE_QUEUE) {
    try {
      const response = yield call(fetch, `/places/${action.placeId}/queues`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({queueName: action.name})
      });
      if (response.ok) {
        console.log("Queue created, response: ", response);
      } else {
        console.error("Queue creation failed: ", response);
      }
    } catch (e) {
      console.error("Create queue failed: ", e);
    }
  }
}

export function* backendSaga() {
  yield all([
    takeEvery(CREATE_QUEUE, queueSaga)
  ]);
}