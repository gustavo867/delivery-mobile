import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { useTheme } from "styled-components";

import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import * as S from "./styles";
import { moderateScale } from "react-native-size-matters";

const { width } = Dimensions.get("screen");

const title: { [key: string]: string } = {
  "1": "Cliente",
  "2": "Entregador",
};

interface Props<T> {
  firstState: keyof T;
  secondState: keyof T;
  state: keyof T;
  handleFirstState: () => void;
  handleSecondState: () => void;
  titleObj?: T;
}

function Switch<T extends { [key: string]: string }>({
  firstState,
  secondState,
  handleFirstState,
  handleSecondState,
  state,
  titleObj = title as T,
}: Props<T>) {
  const theme = useTheme();
  const pos = useSharedValue(-width * 0.25);

  const toogle = (to: number) => {
    pos.value = withTiming(to, {
      duration: 400,
    });
  };

  useEffect(() => {
    if (state === firstState) {
      pos.value !== 0 ? toogle(-width * 0.25) : pos;
    } else {
      pos.value !== width / 2 ? toogle(width * 0.25) : pos;
    }
  }, [state]);

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pos.value }],
  }));

  const firstTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      pos.value,
      [-width * 0.25, width * 0.17],
      ["white", theme.label]
    ),
  }));

  const secondTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      pos.value,
      [-width * 0.25, width * 0.17],
      [theme.label, "white"]
    ),
  }));

  return (
    <S.Container>
      <S.HeaderAuthSlider style={sliderStyle} />
      <S.AnimatedView>
        <S.ActionBtn
          onPress={() => {
            pos.value = withTiming(0, {
              duration: 400,
            });

            handleFirstState();
          }}
        >
          <S.Text style={firstTextStyle as any}>{titleObj[firstState]}</S.Text>
        </S.ActionBtn>
        <S.ActionBtn
          onPress={() => {
            pos.value = withTiming(width / 2, {
              duration: 400,
            });

            handleSecondState();
          }}
        >
          <S.Text style={secondTextStyle as any}>
            {titleObj[secondState]}
          </S.Text>
        </S.ActionBtn>
      </S.AnimatedView>
    </S.Container>
  );
}

export { Switch };
