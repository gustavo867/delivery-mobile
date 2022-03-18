import { Dimensions, TextInput } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  width: ${width * 0.85}px;

  align-self: center;

  margin-top: ${moderateScale(15)}px;
`;

export const Title = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${(props) => props.theme.label};

  font-weight: bold;

  max-width: ${width * 0.82}px;
  width: ${width * 0.82}px;

  align-self: center;
`;

export const Input = styled(TextInput)`
  width: ${width * 0.85}px;
  font-size: ${moderateScale(14)}px;
  color: ${(props) => props.theme.label};

  padding-horizontal: ${moderateScale(12)}px;

  margin-top: ${moderateScale(10)}px;

  height: ${moderateScale(54)}px;

  border-color: ${(props) => props.theme.systemGray4};
  border-width: 1px;

  border-radius: ${moderateScale(6)}px;
`;
