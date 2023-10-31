import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {EventsScreen} from "./screens/EventsScreen";
import Login from './components/Sign/SignUp';

type StackType = {
    EventsScreen: undefined
}

export default function App() {
    const Stack = createNativeStackNavigator<StackType>();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="EventsScreen">
                <Stack.Screen name="EventsScreen" component={EventsScreen}/>
                <Stack.Screen name="ProfilScreen" component={ProfilScreen}/>
            </Stack.Navigator>
            {/* <Login /> */}
        </NavigationContainer>
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
