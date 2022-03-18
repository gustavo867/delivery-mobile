import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled, { css } from "styled-components/native";

const { width } = Dimensions.get("window");

export type ButtonStyleProps = {
  mt?: number;
  ml?: number;
  mr?: number;
  mb?: number;

  bg?: string;

  borderRadius?: number;
};

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<ButtonStyleProps>`
  width: ${width * 0.85}px;
  height: ${moderateScale(54)}px;

  border-radius: ${moderateScale(6)}px;

  background-color: ${(props) => props.theme.systemOrange};

  align-items: center;
  justify-content: center;

  align-self: center;

  margin-top: ${moderateScale(10)}px;

  ${(props) =>
    props.mt &&
    css`
      margin-top: ${props.mt}px;
    `};

  ${(props) =>
    props.ml &&
    css`
      margin-left: ${props.ml}px;
    `};

  ${(props) =>
    props.mb &&
    css`
      margin-bottom: ${props.mb}px;
    `};

  ${(props) =>
    props.mr &&
    css`
      margin-right: ${props.mr}px;
    `};

  ${(props) =>
    props.borderRadius &&
    css`
      border-radius: ${props.borderRadius};
    `};
`;

export const Text = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: #fff;

  width: ${width * 0.78}px;
  max-width: ${width * 0.78}px;

  text-align: center;
`;
