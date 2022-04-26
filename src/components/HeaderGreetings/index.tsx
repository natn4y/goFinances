import React from "react";
import { Text } from "react-native";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  LogoutButton,
} from "./styles";

export function HeaderGreetings() {
  const { signOut } = useAuth();

  return (
    <Container>
      <UserWrapper>
        <UserInfo>
          <Photo source={{ uri: "https://avatars.githubusercontent.com/u/49724359?v=4" }} />
          <User>
            <UserGreeting>
              <Text>Olá,</Text>
            </UserGreeting>

            <UserName>
              <Text>Rodrigo</Text>
            </UserName>
          </User>
        </UserInfo>
        <LogoutButton onPress={signOut}>
          <Icon name="power" />
        </LogoutButton>
      </UserWrapper>
    </Container>
  );
}
