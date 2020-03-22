import { AppState } from "./state";
import { Queue } from "../model/queue";
import { Place } from "../model/place";

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


const UPDATE_PLACE_DETAILS = "@queue/UPDATE_PLACE_DETAILS";
interface UpdatePlaceDetailsAction {
  type: "@queue/UPDATE_PLACE_DETAILS",
  placeDetails: Place
}
export const updatePlaceDetailsCreator = (placeDetails: Place[]) => ({
  type: UPDATE_PLACE_DETAILS,
  placeDetails
});

const initialState = {queues: [], placeDetails: {id: ''} as any};
export const queueReducer = (state: AppState = initialState, action: QueueAction | UpdatePlaceDetailsAction) => {
  switch(action.type) {
    case UPDATE_QUEUES:
      return {
        ...state,
        queues: action.queues
      };
    case UPDATE_PLACE_DETAILS:
      return {
        ...state,
        placeDetails: action.placeDetails
      }
    default:
      return state;
  }
}
