import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DeliveryProvider } from "../modules/deliveries/context/DeliveriesContext";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

export function AuthenticatedRoutes() {
  return (
    <DeliveryProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
          }}
        />
      </Stack.Navigator>
    </DeliveryProvider>
  );
}
