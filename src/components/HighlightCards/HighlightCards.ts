import { RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  width: 100%;

  position: absolute;
  margin-top: ${RFPercentage(23)}px;
`;
