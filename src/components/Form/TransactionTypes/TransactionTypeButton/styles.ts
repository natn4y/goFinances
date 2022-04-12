import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface IconProps {
  type: "up" | "down";
}

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

export const Container = styled.View`
  width: 48%;
  border-width: 1.5px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text_gray};
  border-radius: 5px;
  margin: 0 7px;
`;

export const Button = styled(RectButton)<ContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 3px;
  ${({ isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention.light};
    `};
  ${({ isActive, type }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.success.light};
    `};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success.main : theme.colors.attention.main};
`;

export const Title = styled.Text<ContainerProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  ${({ isActive, type }) =>
    isActive &&
    type === "up" &&
    css`
      color: ${({ theme }) => theme.colors.text_dark};
    `};
  ${({ isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
      color: ${({ theme }) => theme.colors.text_dark};
    `};
  ${({ isActive, type }) =>
    !isActive &&
    type === "up" &&
    css`
      color: ${({ theme }) => theme.colors.text_gray};
    `};
  ${({ isActive, type }) =>
    !isActive &&
    type === "down" &&
    css`
      color: ${({ theme }) => theme.colors.text_gray};
    `};
`;
