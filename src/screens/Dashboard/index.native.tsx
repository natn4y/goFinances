import React, { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Transactions, TransactionList, Title } from "../../components/Transactions/Transactions";

import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/Transactions/TransactionCard";

import { Container, LoadContainer } from "./styles.native";
import { HighlightCard } from "../../components/HighlightCards/HighlightCard";
import { HighlightCards } from "../../components/HighlightCards/HighlightCards";
import { HeaderGreetings } from "../../components/HeaderGreetings";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [HighlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();
  const { user } = useAuth();

  const dataKey = `@gofinances:transactions_user:${user.id}`;

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const lastTransaction = new Date (Math.max.apply(
        Math,
        collection
          .filter((transactions) => transactions.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
  }

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
      }).format(new Date(item.date));

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

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpenses = getLastTransactionDate(transactions, 'negative');
    const lastInterval = `01 a ${lastTransactionExpenses}`

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          .replace("R$", `R$ `),
          lastTransaction: `${lastTransactionEntries.includes('Invalid Date') ?
          'Sem entradas' : `Última entrada dia ${lastTransactionEntries}`}`
      },
      expenses: {
        amount: expensiveTotal
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          .replace("R$", `R$ `),
          lastTransaction: `${lastTransactionExpenses.includes('Invalid Date') ?
          'Sem saídas' : `Última saída dia ${lastTransactionExpenses}`}`
      },
      total: {
        amount: total
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          .replace("R$", ` R$ `),
          lastTransaction: `${lastInterval.includes('Invalid Date') ?
          '' : `${lastInterval}`}`
      },
    });
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      //AsyncStorage.removeItem(dataKey);
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary.main} size="large" />
        </LoadContainer>
      ) : (
        <>
          <HeaderGreetings />
          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={HighlightData.entries.amount}
              lastTransaction={HighlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={HighlightData.expenses.amount}
              lastTransaction={HighlightData.expenses.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={HighlightData?.total?.amount}
              lastTransaction={HighlightData.total.lastTransaction}
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
        </>
      )}
    </Container>
  );
}
