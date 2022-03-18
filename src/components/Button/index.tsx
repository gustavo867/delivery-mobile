import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import * as S from "./styles";

type Props = {
  text: string;
  textColor?: string;
  isLoading?: boolean;
} & TouchableOpacityProps &
  S.ButtonStyleProps;

function Button({ text, textColor, isLoading, ...rest }: Props) {
  return (
    <S.Container {...(rest as any)}>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={textColor ? textColor : "#fff"}
        />
      ) : (
        <S.Text
          style={{
            color: textColor ? textColor : "#fff",
          }}
        >
          {text}
        </S.Text>
      )}
    </S.Container>
  );
}

export default Button;
