import React from "react";
// prettier-ignore
import { Text } from "react-native";
// prettier-ignore
import {
  Container,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
} from "./styles";

export function Header() {
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
        <Icon name="power" />
      </UserWrapper>
    </Container>
  );
}
