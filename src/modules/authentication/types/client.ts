export type Client = {
  username: string;
  id: string;
  /** IS A ENCRYPTED PASSWORD */
  password: string;
  token: string;

  client_type: "deliveryman" | "client";
};

export type ClientLoginResponse = {
  client: {
    username: string;
    id: string;
  };
  deliveryman: {
    username: string;
    id: string;
  };
  token: string;
};

export type ClientRegisterResponse = {
  username: string;
  id: string;
};
