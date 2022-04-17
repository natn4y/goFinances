import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View``;

export const LoadContainer = styled.View`
  height: 80%;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 24 },
  showsVerticalScrollIndicator: false,
})`
  margin-bottom: auto;
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const SelectIcon = styled(Feather)`
  font-size: ${RFValue(34)}px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;
