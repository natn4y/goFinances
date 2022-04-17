import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LoadContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;
