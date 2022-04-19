import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import {
  Container,
  ImageContainer,
  Text
} from "./styles";

interface SignInSocialButtonProps extends RectButtonProps {
  svg: React.FC<SvgProps>;
  title: string;
}

export function SignInSocialButton({
  svg: Svg,
  title,
  ...rest
}: SignInSocialButtonProps) {
  return (
    <Container {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Text>{title}</Text>
    </Container>
  );
}
