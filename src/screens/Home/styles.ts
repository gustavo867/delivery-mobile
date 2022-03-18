import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";
import { SafeBottomAreaContainer } from "../../components/SafeBottomAreaContainer";

const { width } = Dimensions.get("screen");

export const Container = styled(SafeBottomAreaContainer)`
  flex: 1;
  background-color: ${(props) => props.theme.systemBackground};
`;

export const TitleContainer = styled.View`
  flex-direction: row;

  align-items: center;

  justify-content: space-between;

  width: ${width * 0.9}px;
  max-width: ${width * 0.9}px;

  margin-top: ${moderateScale(15)}px;

  align-self: center;
`;

export const Title = styled.Text`
  font-size: ${moderateScale(22)}px;
  font-weight: 300;

  letter-spacing: 0.4px;

  width: ${width * 0.6}px;
  max-width: ${width * 0.6}px;
`;

export const CenteredTitle = styled.Text`
  font-size: ${moderateScale(22)}px;
  font-weight: 300;

  letter-spacing: 0.4px;

  width: ${width * 0.9}px;
  max-width: ${width * 0.9}px;

  margin-top: ${moderateScale(15)}px;

  align-self: center;
`;

export const AddIconContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  width: ${moderateScale(30)}px;
  height: ${moderateScale(30)}px;

  background-color: ${(props) => props.theme.systemOrange};

  align-items: center;
  justify-content: center;

  border-radius: ${moderateScale(6)}px;
`;

export const LargeHeightMargin = styled.View`
  height: ${moderateScale(40)}px;
`;
