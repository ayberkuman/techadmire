export interface User {
  id: string;
  email: string;
  password: string;
}

export interface Application {
  id: string;
  name: string;
  university: string;
  country: string;
  duration: number;
  cost: number;
  deadline: string;
  language: string;
}
