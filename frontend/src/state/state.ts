export interface Person {
  id: string;
  name: string;
  ticketNumber: number;
}

export type PublicPerson = Omit<Person, 'name'>;

export interface AppState {
  persons: Person[];
}
