export interface Gender {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  genderId: number | null;
  image?: string;
}
