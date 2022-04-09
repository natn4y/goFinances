import React, { useState } from "react";
import { Button } from "../../components/Form/Button/Index";

import { Input } from "../../components/Form/Input";
import { TransactionsTypes } from "../../components/Form/TransactionTypes/TransactionTypes";
import { TransactionTypeButton } from "../../components/Form/TransactionTypes/TransactionTypeButton";
import { CategorySelect } from "../../components/Form/TransactionTypes/CategorySelect";
// prettier-ignore

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
} from './style';

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionTypeButtonSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeButtonSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeButtonSelect("down")}
              isActive={transactionType === "down"}
            />
          </TransactionsTypes>
          <CategorySelect title="Categoria" />
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
