import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from 'react-native';
import { Provider } from "react-redux";
import { EventsScreen } from "./screens/EventsScreen";
import ProfilScreen from './screens/ProfilScreen';
import { store } from "./store/store";
import SignUpScreen from './screens/SignUpScreen';


export type StackType = {
    EventsScreen: undefined,
    SignUpScreen: undefined,
    SignInScreen: undefined,
    ProfilScreen: undefined
}

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator<StackType>();

export default function App() {


    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName="EventsScreen">
                    <Tab.Screen name="EventsScreen" component={EventsScreen}
                        options={{
                            tabBarLabel: "Événements",
                            tabBarIcon: () => (
                                <MaterialIcons name="event-note" size={24} color="black" />
                            ),
                        }}
                    />
                    <Tab.Screen name="ProfilScreen" component={ProfilScreen} options={{
                        tabBarLabel: "Profil",
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="account" size={24} color="black" />
                        ),
                    }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export function SignStackScreen() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='ProfilScreen'>
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="SignInScreen" component={SignUpScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
