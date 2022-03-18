import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../modules/authentication/hooks/useAuth";
import Register from "../screens/Register";
import SignIn from "../screens/SignIn";
import { AuthenticatedRoutes } from "./Authenticated.routes";

const Stack = createNativeStackNavigator();

export function Routes() {
  const { client } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {client !== null ? (
        <Stack.Screen
          name="AuthenticatedRoutes"
          component={AuthenticatedRoutes}
        />
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              title: "Login",
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Cadastro",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
