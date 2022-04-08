import React from "react";

import { Input } from "../../components/Form/Input";
// prettier-ignore
import {
  Container,
  Header,
  Title,
  Form,
} from './style';

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Input placeholder="Nome" />
        <Input placeholder="Preço" />
      </Form>
    </Container>
  );
}
