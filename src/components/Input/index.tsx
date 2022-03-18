import { TextInputProps } from "react-native";
import * as S from "./styles";

type Props = {
  title: string;
} & TextInputProps;

function Input({ title, ...rest }: Props) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Input {...rest} />
    </S.Container>
  );
}

export default Input;
