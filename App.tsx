import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import AppLoading from "expo-app-loading";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Dashboard } from "./src/screens/Dashboard/index.native";
import theme from "./src/global/styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor="black" />
      <Dashboard />
    </ThemeProvider>
  );
}
