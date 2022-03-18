import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

export const Container = styled.View`
  width: ${width * 0.9}px;

  border-radius: ${moderateScale(6)}px;

  padding: ${moderateScale(10)}px;

  margin-top: ${moderateScale(10)}px;

  align-self: center;

  background-color: ${(props) => props.theme.elevated};

  border-color: ${(props) => props.theme.systemGray5};
  border-width: 1px;

  flex-direction: row;

  align-items: flex-start;
  justify-content: space-between;
`;

export const Column = styled.View``;

export const ProductName = styled.Text`
  width: ${width * 0.4}px;
  max-width: ${width * 0.4}px;

  text-transform: capitalize;

  align-self: center;

  color: ${(props) => props.theme.label};

  font-size: ${moderateScale(20)}px;
  font-weight: 500;
`;

export const Badge = styled.View`
  padding: ${moderateScale(5)}px;

  align-items: center;
  justify-content: center;

  border-radius: ${moderateScale(4)}px;

  width: ${width * 0.4}px;

  background-color: ${(props) => props.theme.systemTeal};
`;

export const SubText = styled.Text`
  font-size: ${moderateScale(14)}px;
  font-weight: 400;
  color: ${(props) => props.theme.systemBlue};

  max-width: ${width * 0.4}px;
  width: ${width * 0.4}px;

  align-self: center;

  margin-top: ${moderateScale(5)}px;
`;

export const CreateAt = styled.Text`
  font-size: ${moderateScale(15)}px;
  font-weight: bold;
  color: #fff;

  text-align: center;
`;
