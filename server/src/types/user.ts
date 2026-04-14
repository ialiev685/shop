export interface User {
  email: string;
  id: number;
  isActivate: boolean;
  role: string;
  accessToken?: string;
}
