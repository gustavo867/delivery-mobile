import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = ViewProps;

export const SafeBottomAreaContainer: React.FC<Props> = ({
  children,
  style,
  ...rest
}) => {
  const safeArea = useSafeAreaInsets();

  return (
    <View
      style={[
        style,
        {
          flex: 1,
          paddingBottom: safeArea.bottom,
        },
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};
