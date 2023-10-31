import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {EventsScreen} from "./screens/EventsScreen";
import Login from './components/Sign/SignUp';
import {initializeApp} from 'firebase/app';
import {Provider} from "react-redux";
import {store} from "./store/store";


type StackType = {
    EventsScreen: undefined
}

export default function App() {
    const Stack = createNativeStackNavigator<StackType>();

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="EventsScreen">
                    <Stack.Screen name="EventsScreen" component={EventsScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
