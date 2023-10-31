import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {EventsScreen} from "./screens/EventsScreen";
import {initializeApp} from 'firebase/app';

type StackType = {
    EventsScreen: undefined
}


const firebaseConfig = {
    apiKey: "AIzaSyCYz5p0fCc7pdkPR4dZmBcS1DjVEvlIA54",
    projectId: "lafrontapp",
    appId: "1:541725162213:ios:47d2f783544be5a9ac320c",
}

const app = initializeApp(firebaseConfig);

export default function App() {
    const Stack = createNativeStackNavigator<StackType>();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="EventsScreen">
                <Stack.Screen name="EventsScreen" component={EventsScreen}/>
            </Stack.Navigator>
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
