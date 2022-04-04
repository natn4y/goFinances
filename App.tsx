import React from "react";
import { View, Text } from "react-native";

import theme from "./src/global/styles/theme";

import { ThemeProvider } from "styled-components";
import { Dashboard } from "./src/components/Dashboard";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Text>Hello</Text>
    </ThemeProvider>
  );
}
