import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-native";
import { Button } from "../../components/Form/Button/Index";
import { InputForm } from "../../components/Form/InputForm";
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

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const { control, handleSubmit } = useForm();

  function handleTransactionTypeButtonSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.name,
    }
    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm control={ control } name="name" placeholder="Nome" />
          <InputForm control={ control } name="amount" placeholder="Preço" />
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
        <Button
          title="Enviar"
          onPress={handleSubmit(handleRegister)}
        />
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
