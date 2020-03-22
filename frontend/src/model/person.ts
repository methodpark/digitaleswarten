export interface Person {
  id: string;
  name: string;
  ticketNumber: number;
  state: string;
}

export type PublicPerson = Omit<Person, 'name'>;
