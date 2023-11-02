import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EventsScreen } from "./screens/EventsScreen";

type StackType = {
    EventsScreen: undefined
}

export default function App() {
    const Stack = createNativeStackNavigator<StackType>();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="EventsScreen">
                <Stack.Screen name="EventsScreen" component={EventsScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
