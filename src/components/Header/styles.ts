import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

export const Container = styled(SafeAreaView)`
  width: ${width}px;
  padding-top: ${moderateScale(10)}px;

  padding-horizontal: ${moderateScale(20)}px;
  padding-bottom: ${moderateScale(10)}px;

  background-color: ${(props) => props.theme.systemOrange};

  flex-direction: row;

  align-items: center;
  justify-content: space-between;
`;

export const Greeting = styled.Text`
  color: #fff;
  width: ${width * 0.65}px;
  max-width: ${width * 0.65}px;

  font-size: ${moderateScale(25)}px;

  align-self: center;
`;

export const ContrastText = styled.Text`
  font-weight: bold;
  color: #fff;
`;
