import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";

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

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [HighlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const dataKey = "@gofinances:transactions";

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      if (item.type === "positive") {
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }

      let amount = Number(item.amount).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      amount = amount.replace("R$", `R$ `);

      const date = Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }).format(item.date);

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      };
    });

    setTransactions(transactionsFormatted);

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          .replace("R$", `R$ `),
      },
      expensives: {
        amount: expensiveTotal
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          .replace("R$", `R$ `),
      },
      total: {
        amount: total
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          .replace("R$", `R$ `),
      },
    });
  }

  useFocusEffect(
    useCallback(() => {
      //AsyncStorage.removeItem(dataKey);
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      <HeaderGreetings />
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount={HighlightData?.entries?.amount}
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={HighlightData?.expensives?.amount}
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={HighlightData?.total?.amount}
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
