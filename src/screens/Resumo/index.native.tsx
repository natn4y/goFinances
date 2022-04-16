import React from "react";
import { HeaderSection } from "../../components/HeaderSection";
import { HistoryCard } from "../../components/HistoryCard";
import { Container } from "./styles.native";

export function Resumo() {
  return (
    <Container>
      <HeaderSection title="Resumo por categoria" />
      <HistoryCard
        title="Compras"
        amount="R$ 150,50"
        color="red"
      />
    </Container>
  );
}
