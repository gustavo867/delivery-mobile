import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Switch } from "../../components/Switch";
import { useAuth } from "../../modules/authentication/hooks/useAuth";

import * as S from "./styles";

function Register() {
  const [userType, setUserType] = useState<"deliveryman" | "client">("client");
  const { handleRegisterClient, isLoading, handleValidateClientData } =
    useAuth();
  const { navigate } = useNavigation();

  const [data, setData] = useState({
    username: "",
    password: "",
    confirmed_password: "",
  });

  const handleSetData = useCallback((key: keyof typeof data, value: string) => {
    setData((s) => ({
      ...s,
      [key]: value,
    }));
  }, []);

  function handleRegister() {
    const canPass = handleValidateClientData({
      username: data.username,
      password: data.password,
    });

    if (canPass) {
      if (data.password !== data.confirmed_password) {
        Alert.alert("As senhas não coincidem");

        return;
      }

      handleRegisterClient({
        username: data.username,
        password: data.password,
        client_type: userType,
      });
    }
  }

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
          title="Nome de usuário"
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
          onChangeText={(text) => handleSetData("password", text)}
        />
        <Input
          title="Confirme a senha"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          placeholder="Confirme a senha"
          value={data.confirmed_password}
          onSubmitEditing={handleRegister}
          onChangeText={(text) => handleSetData("confirmed_password", text)}
        />

        <TouchableOpacity onPress={() => navigate("SignIn")}>
          <S.AlreadyHaveAnAccount>
            ja tem uma conta? <S.ContrastText>faça o login</S.ContrastText>
          </S.AlreadyHaveAnAccount>
        </TouchableOpacity>

        <Button
          onPress={handleRegister}
          isLoading={isLoading}
          mt={moderateScale(20)}
          text="Cadastrar"
        />
      </KeyboardAvoidingView>
    </S.Container>
  );
}

export default Register;
