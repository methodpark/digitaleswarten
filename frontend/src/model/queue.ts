import { Person, PublicPerson } from './person';

export interface Queue {
  id: string;
  name: string;
  entries: Person[];
}

export type PublicQueue = Queue & { entries: PublicPerson[] };
