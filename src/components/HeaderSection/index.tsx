import React from "react";
import { Header, Title } from "./styles";

interface HeaderSectionProps {
  title: string;
}

export function HeaderSection({ title }: HeaderSectionProps) {
  return (
    <Header>
      <Title>{title}</Title>
    </Header>
  );
}
