import { Queue } from "../model/queue";
import { Place } from "../model/place";

export interface AppState {
  queues: Queue[];
  placeDetails: Place;
}
