import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction
} from "./styles";

import TextTicker from "react-native-text-ticker";

interface Props {
  type: "up" | "down" | "total";
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export function HighlightCard({
  type,
  title,
  amount,
  lastTransaction
}: Props) {

  return (
    <Container type={type}>
      <Header>
        <Title
          type={type}>{title}</Title>
        <Icon
          name={icon[type]}
          type={type}
        >
        </Icon>
      </Header>

      <Footer>
        {type !== "total" && <Amount type={type}>{amount}</Amount>}
        {type === "total" && (
          <TextTicker duration={5000} loop bounce repeatSpacer={50} marqueeDelay={1000}>
            <Amount type={type}>{amount}</Amount>
          </TextTicker>
        )}
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
