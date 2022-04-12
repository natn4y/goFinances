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

export const Container = styled(RectButton)<ContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: ${({ isActive, type }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text_gray};
  border-radius: 5px;
  padding: 16px;
  margin: 0 7px;
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
