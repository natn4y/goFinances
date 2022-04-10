import React, { useState } from "react";
import { Button } from "../../components/Form/Button/Index";
import { Modal } from "react-native";
import { Input } from "../../components/Form/Input";
import { TransactionsTypes } from "../../components/Form/TransactionTypes/TransactionTypes";
import { TransactionTypeButton } from "../../components/Form/TransactionTypes/TransactionTypeButton";
// prettier-ignore

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
} from './style';
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  function handleTransactionTypeButtonSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
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
          <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
        </Fields>
        <Button title="Enviar" />
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category.name}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
