import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/routes/routes";
import { lightTheme } from "./src/theme";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./src/modules/authentication/context/AuthContext";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View
              style={{
                flex: 1,
              }}
            >
              <Routes />
            </View>
          </TouchableWithoutFeedback>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
