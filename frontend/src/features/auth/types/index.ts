export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginUser = {
  id: number;
  email: string;
  role: string;
};

export type LoginResponse = {
  data: LoginUser;
};

export type RegisterRequest = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type RegisterUser = {
  id: number;
  email: string;
  role: string;
};

export type RegisterResponse = {
  data: RegisterUser;
};
