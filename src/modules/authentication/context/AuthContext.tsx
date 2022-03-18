import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { decryptPassword, encryptPassword } from "../../../lib/encrypt";
import { api } from "../../../services/api";
import {
  Client,
  ClientLoginResponse,
  ClientRegisterResponse,
} from "../types/client";

export type IAuthContext = ReturnType<typeof useAuthProviderValues>;

type HandleLoginClientProps = {
  username: string;
  password: string;

  client_type: "deliveryman" | "client";
};

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function useAuthProviderValues() {
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState<Client | null>(null);

  const handleValidateClientData = useCallback(
    ({ username, password }: { username: string; password: string }) => {
      if (!username) {
        Alert.alert("Por favor insira o nome de usuário");

        return false;
      }

      if (password?.length < 7) {
        Alert.alert("A senha tem que ter no mínimo 8 caracteres");

        return false;
      }

      return true;
    },
    []
  );

  const handleLoginClient = useCallback(
    async ({ username, password, client_type }: HandleLoginClientProps) => {
      setIsLoading(true);

      const isValidData = handleValidateClientData({ username, password });

      if (!isValidData) {
        setIsLoading(false);

        return;
      }

      try {
        const res = await api.post<ClientLoginResponse>(
          `/${client_type}/authenticate`,
          { username, password }
        );

        const client = {
          id: res.data[client_type].id,
          username: res.data[client_type].username,
          token: res.data.token,
          password: encryptPassword(password),
          client_type,
        };

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;

        AsyncStorage.setItem("@client", JSON.stringify(client));

        setClient(client);

        setIsLoading(false);
      } catch (err: any) {
        Alert.alert(err?.response?.data?.message);

        setIsLoading(false);
      }
    },
    []
  );

  const handleRegisterClient = useCallback(
    async ({ username, password, client_type }: HandleLoginClientProps) => {
      setIsLoading(true);

      const isValidData = handleValidateClientData({ username, password });

      if (!isValidData) {
        setIsLoading(false);

        return;
      }

      try {
        const res = await api.post<ClientRegisterResponse>(`/${client_type}`, {
          username,
          password,
        });

        if (res.data.username) {
          await handleLoginClient({
            username,
            password,
            client_type,
          });
        } else {
          Alert.alert("Erro ao se cadastrar");

          setIsLoading(false);
        }
      } catch (err: any) {
        Alert.alert(err?.response?.data?.message);

        setIsLoading(false);
      }
    },
    []
  );

  const handleLogOutClient = useCallback(async () => {
    setClient(null);

    await AsyncStorage.removeItem("@client");
  }, []);

  useEffect(() => {
    async function getUserFromStorage() {
      const clientStorage = await AsyncStorage.getItem("@client");

      if (clientStorage) {
        const clientStorageParsed = JSON.parse(clientStorage) as Client;

        handleLoginClient({
          username: clientStorageParsed?.username,
          password: decryptPassword(clientStorageParsed.password),
          client_type: clientStorageParsed.client_type,
        });
      }
    }

    getUserFromStorage();
  }, []);

  return {
    client,
    setClient,
    handleLoginClient,
    handleRegisterClient,
    isLoading,
    handleLogOutClient,
    handleValidateClientData,
  };
}

export const AuthProvider: React.FC = ({ children }) => {
  const values = useAuthProviderValues();

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
