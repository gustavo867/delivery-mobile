import { useAuth } from "../../modules/authentication/hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import * as S from "./styles";
import { TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";

function Header() {
  const { client, handleLogOutClient } = useAuth();

  return (
    <S.Container>
      <S.Greeting>
        😃 Olá, <S.ContrastText>{client?.username} </S.ContrastText>
      </S.Greeting>
      <TouchableOpacity onPress={() => handleLogOutClient()}>
        <AntDesign name="logout" size={moderateScale(24)} color="white" />
        <S.ContrastText
          style={{
            marginTop: moderateScale(8),
          }}
        >
          Sair
        </S.ContrastText>
      </TouchableOpacity>
    </S.Container>
  );
}

export default Header;
