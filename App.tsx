import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer, ParamListBase} from "@react-navigation/native";
import {EventsScreen} from "./screens/EventsScreen";
import {Provider} from "react-redux";
import {store} from "./store/store";
import React, {useEffect, useState} from "react";
import LoginScreen from "./screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { supabase } from "./supabaseConfig";
import { Session } from "@supabase/supabase-js";
import ProfileScreen from './screens/ProfileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import InfosProfilScreen from './screens/InfosProfilScreen';
import {EventCreationScreen} from "./screens/EventCreationScreen";
import {SignInScreen} from "./screens/SignInScreen";

export interface RootStackParamList extends ParamListBase {
    EventsScreen: undefined,
    EventScreen: undefined,
    LoginScreen: undefined,
    ProfileScreen: undefined,
    EventCreationScreen: undefined,
    InfosProfilScreen: undefined,
}

export interface AuthStackParamList extends ParamListBase {

}

export interface MainTabParamList extends ParamListBase {
    ProfilScreen: undefined,
    EventsScreen: undefined,
    EventScreen: {
        id: number
    },
    EventCreationScreen: undefined
    InfosProfilScreen: undefined,
}

export default function App() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, []);


    const RootStack = createNativeStackNavigator<RootStackParamList>();
    const MainTab = createBottomTabNavigator<RootStackParamList>();

    function MainStack() {
        return (
            <MainTab.Navigator initialRouteName="EventsScreen">
                <MainTab.Screen name="ProfilScreen" component={ProfileScreen} options={{
                    tabBarLabel: "Profil",
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="account" size={24} color="black"/>
                    ),
                }}
                />
                <MainTab.Screen name="EventsScreen" component={EventsScreen}
                                options={{
                                    tabBarLabel: "Événements",
                                    tabBarIcon: () => (
                                        <MaterialIcons name="event-note" size={24} color="black"/>
                                    ),
                                }}
                />
                <MainTab.Screen name="EventCreationScreen" component={EventCreationScreen}/>

            </MainTab.Navigator>
        )
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <RootStack.Navigator>
                    {session && session.user ?
                        <>
                            <RootStack.Screen name="MainStack" component={MainStack}/>
                            <RootStack.Screen name="InfosProfilScreen" component={InfosProfilScreen}/>
                        </>
                        : (<>
                            <RootStack.Screen name="Login" component={LoginScreen}/>
                            <RootStack.Screen name="SignIn" component={SignInScreen}/>
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
