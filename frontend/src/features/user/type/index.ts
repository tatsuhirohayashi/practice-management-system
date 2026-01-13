export type UserType = {
  id: number;
  first_name: string;
  last_name: string;
};

export type ClientType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

export type ClientListType = {
  data: ClientType[];
};

export type CreateClientRequest = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type CreateClientResponse = {
  data: ClientType;
};
