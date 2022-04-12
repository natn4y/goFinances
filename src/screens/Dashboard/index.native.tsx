import React from "react";

import { Transactions, TransactionList, Title } from "../../components/Transactions/Transactions";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/Transactions/TransactionCard";

import { Container } from "./styles.native";
import { HighlightCard } from "../../components/HighlightCards/HighlightCard";
import { HighlightCards } from "../../components/HighlightCards/HighlightCards";
import { HeaderGreetings } from "../../components/HeaderGreetings";
export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de sites",
      amount: "R$ 12.000,00",
      category: { label: "Vendas", icon: "dollar-sign" },
      date: "13/04/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: { label: "Alimentação", icon: "coffee" },
      date: "10/04/2020",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "R$ 1.200",
      category: { label: "Casa", icon: "shopping-bag" },
      date: "10/04/2020",
    },
  ];

  return (
    <Container>
      <HeaderGreetings />
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
