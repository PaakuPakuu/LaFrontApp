import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EventsScreen } from "./screens/EventsScreen";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { supabase } from "./supabaseConfig";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import Login from "./screens/Login";
import { EventScreen } from "./screens/EventScreen";
import { EventCreationScreen } from './screens/EventCreationScreen';
import ProfileScreen from './screens/ProfileScreen';


interface StackType extends ParamListBase {
    EventsScreen: undefined,
    EventScreen: { eventId: string },
    EventCreationScreen: undefined
    ProfileScreen: undefined
}

export default function App() {
    const Stack = createNativeStackNavigator<StackType>();
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    return (
        <Provider store={store}>
            {session && session.user ?

                <NavigationContainer>
                    <Stack.Navigator initialRouteName="EventsScreen">
                        <Stack.Screen name="EventsScreen" component={EventsScreen} />
                        <Stack.Screen name="EventScreen" component={EventScreen} />
                        <Stack.Screen name="EventCreationScreen" component={EventCreationScreen} />
                        <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
                :
                <Login />}
        </Provider>
    );
}
