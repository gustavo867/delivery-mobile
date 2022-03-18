import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");

export const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.systemBackground};
`;

export const LargeHeightMargin = styled.View`
  height: ${moderateScale(20)}px;
`;

export const Title = styled.Text`
  font-size: ${moderateScale(25)}px;
  color: ${(props) => props.theme.label};

  margin-bottom: ${moderateScale(20)}px;
`;

export const DontHaveAccountText = styled.Text`
  font-size: ${moderateScale(15)}px;
  color: ${(props) => props.theme.secondaryLabel};

  width: ${width * 0.82}px;
  max-width: ${width * 0.82}px;

  margin-top: ${moderateScale(10)}px;

  align-self: center;
  text-align: right;
`;

export const ContrastText = styled.Text`
  font-weight: bold;
  color: ${(props) => props.theme.systemOrange};
`;
