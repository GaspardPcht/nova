export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  token: string;
}

export interface ApiResponse {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  token?: string;
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: any) => void;

  isAuthenticated: boolean;
} 