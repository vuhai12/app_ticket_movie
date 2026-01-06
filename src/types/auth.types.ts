export interface UserState {
  data: User[];
  loading: boolean;
  error: string | null;
}

export interface User {
  id: string;
  auth_id: string | null;
  type: "guest" | "auth";
}
