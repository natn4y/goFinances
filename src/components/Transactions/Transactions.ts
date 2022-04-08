import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { FlatList, FlatListProps } from "react-native";
import { DataListProps } from "../../screens/Dashboard/index.native";

export const Transactions = styled.View`
  flex: 100%;
  padding: 0 24px;
  margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  margin-bottom: 16px;
`;

export const TransactionList = styled(
  FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``;
