import { StyleSheet } from 'react-native';
import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import { EventsScreen } from "./screens/EventsScreen";
import { Provider } from "react-redux";
import { store } from "./store/store";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { supabase } from "./supabaseConfig";
import { Session } from "@supabase/supabase-js";
import ProfileScreen from './screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { EventCreationScreen } from "./screens/EventCreationScreen";
import { SignInScreen } from "./screens/SignInScreen";
import LoginScreen from "./screens/LoginScreen";
import { EventScreen } from "./screens/EventScreen";
import { UserEvent } from "./models/customModels";

export type RootStackParamList = {
    MainStack: undefined,
    LoginScreen: undefined,
    ProfileScreen: undefined,
    SignInScreen: undefined,
}

export type MainTabParamList = {
    EventsStack: undefined,
    ProfilScreen: undefined,
    EventCreationScreen: undefined,
    CreationProfileScreen: undefined,
}

export type EventStackParamList = {
    EventsScreen: undefined,
    EventScreen: UserEvent,
}

export default function App() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

    }, []);


    const RootStack = createNativeStackNavigator<RootStackParamList>();
    const MainTab = createBottomTabNavigator<MainTabParamList>();
    const EventStackNavigator = createNativeStackNavigator<EventStackParamList>();

    function EventStack() {
        return (
            <>
                <EventStackNavigator.Navigator initialRouteName="EventsScreen">
                    <EventStackNavigator.Screen options={{ title: 'Les évènements' }} name="EventsScreen" component={EventsScreen} />
                    <EventStackNavigator.Screen options={{ title: 'L\'évènement en détail' }} name="EventScreen" component={EventScreen} />
                </EventStackNavigator.Navigator>
            </>
        )
    }


    function MainStack() {
        return (
            <MainTab.Navigator initialRouteName='EventsStack'>
                <MainTab.Screen name="EventsStack" component={EventStack}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Événements",
                        tabBarIcon: () => (
                            <MaterialIcons name="event-note" size={24} color="black" />
                        ),
                    }}
                />
                <MainTab.Screen name="EventCreationScreen" component={EventCreationScreen} 
                    options={{
                        headerShown: false,
                        tabBarLabel: "Créer un event",
                        tabBarIcon: () => (
                            <Ionicons name="create" size={24} color="black" />
                        ),
                    }}
                />

                <MainTab.Screen name="ProfilScreen" component={ProfileScreen} options={{
                    title: 'Profil',
                    tabBarLabel: "Profil",
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="account" size={24} color="black" />
                    ),
                }}
                />
            </MainTab.Navigator >
        )
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <RootStack.Navigator>
                    {session && session.user ?
                        <>
                            <RootStack.Screen options={{ headerShown: false }} name="MainStack" component={MainStack} />
                        </>
                        : (<>
                            <RootStack.Screen name="LoginScreen" component={LoginScreen} />
                            <RootStack.Screen name="SignInScreen" component={SignInScreen} />
                        </>)
                    }
                </RootStack.Navigator>
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
