import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Switch } from "../../components/Switch";
import { useAuth } from "../../modules/authentication/hooks/useAuth";

import * as S from "./styles";

function SignIn() {
  const [userType, setUserType] = useState<"deliveryman" | "client">("client");
  const { handleLoginClient, isLoading } = useAuth();
  const { navigate } = useNavigation();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSetData = useCallback((key: keyof typeof data, value: string) => {
    setData((s) => ({
      ...s,
      [key]: value,
    }));
  }, []);

  return (
    <S.Container>
      <S.LargeHeightMargin />

      <Switch
        firstState="client"
        secondState="deliveryman"
        state={userType}
        titleObj={{
          deliveryman: "Entregador",
          client: "Cliente",
        }}
        handleFirstState={() => setUserType("client")}
        handleSecondState={() => setUserType("deliveryman")}
      />

      <S.LargeHeightMargin />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Input
          title="Usuário"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Insira o seu nome de usuário"
          value={data.username}
          onChangeText={(text) => handleSetData("username", text)}
        />
        <Input
          title="Senha"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          placeholder="Insira sua senha"
          value={data.password}
          onSubmitEditing={() =>
            handleLoginClient({
              username: data.username,
              password: data.password,
              client_type: userType,
            })
          }
          onChangeText={(text) => handleSetData("password", text)}
        />

        <TouchableOpacity onPress={() => navigate("Register")}>
          <S.DontHaveAccountText>
            Não tem uma conta? <S.ContrastText>cadastre-se</S.ContrastText>
          </S.DontHaveAccountText>
        </TouchableOpacity>

        <Button
          onPress={() =>
            handleLoginClient({
              username: data.username,
              password: data.password,
              client_type: userType,
            })
          }
          isLoading={isLoading}
          mt={moderateScale(20)}
          text="Entrar"
        />
      </KeyboardAvoidingView>
    </S.Container>
  );
}

export default SignIn;
