import { AppState } from "./state";
import { Queue } from "../model/queue";

const UPDATE_QUEUES = "@queue/UPDATE_QUEUES";
interface UpdateQueuesAction {
  type: "@queue/UPDATE_QUEUES",
  queues: Queue[]
}
export const updateQueueCreator = (queues: Queue[]) => ({
  type: UPDATE_QUEUES,
  queues
});
type QueueAction = UpdateQueuesAction;

const initialState = {queues: []};
export const queueReducer = (state: AppState = initialState, action: QueueAction) => {
  switch(action.type) {
    case UPDATE_QUEUES:
      return {
        ...state,
        queues: action.queues
      };
    default:
      return state;
  }
}