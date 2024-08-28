export interface IUser {
  id: number;
  email: string;
  role: {
    id: number;
    name: string;
  };
  name: string;
  apis?: {
    id: number;
    method: string;
    endpoint: string;
  }[];
}
