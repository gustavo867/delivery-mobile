import { Dimensions, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

export const Container = styled.View`
  height: ${moderateScale(45)}px;
  width: ${width}px;

  align-items: center;
  justify-content: center;

  align-self: center;
`;

export const HeaderAuthSlider = styled(Animated.View)`
  width: ${width / 2 - moderateScale(20)}px;

  border-radius: ${moderateScale(6)}px;
  height: ${moderateScale(45)}px;

  background-color: ${(props) => props.theme.systemOrange};
`;

export const AnimatedView = styled(Animated.View)`
  width: ${width}px;

  position: absolute;

  z-index: 1;

  align-self: center;

  align-items: center;
  justify-content: space-around;

  flex-direction: row;
`;

export const ActionBtn = styled(AnimatedButton).attrs({
  activeOpacity: 0.8,
})`
  height: ${moderateScale(45)}px;
  width: ${width / 2 - moderateScale(20)}px;

  align-items: center;
  justify-content: center;

  border-radius: ${moderateScale(6)}px;
`;

export const TextContainer = styled(Animated.View)`
  height: ${moderateScale(45)}px;
  width: ${width};

  align-self: center;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Text = styled(Animated.Text)`
  color: #fff;
  font-weight: 700;
  font-size: ${moderateScale(16)}px;

  width: ${width / 2}px;
  max-width: ${width / 2}px;

  text-align: center;
`;
