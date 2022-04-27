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
  const { signOut, user } = useAuth();
  return (
    <Container>
      <UserWrapper>
        <UserInfo>
          <Photo source={{ uri: user.photo}} />
          <User>
            <UserGreeting>
              <Text>Olá,</Text>
            </UserGreeting>

            <UserName>
              <Text>{user.name}</Text>
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
