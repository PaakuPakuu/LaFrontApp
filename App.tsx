import {StyleSheet} from 'react-native';
import {NavigationContainer, ParamListBase} from "@react-navigation/native";
import {EventsScreen} from "./screens/EventsScreen";
import {Provider} from "react-redux";
import {store} from "./store/store";
import React, {useEffect, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {supabase} from "./supabaseConfig";
import {Session} from "@supabase/supabase-js";
import ProfileScreen from './screens/ProfileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {EventCreationScreen} from "./screens/EventCreationScreen";
import {SignInScreen} from "./screens/SignInScreen";
import {useGetCurrentProfileQuery} from "./store/supabaseApi";
import {CreateProfileScreen} from "./screens/CreateProfileScreen"
import LoginScreen from "./screens/LoginScreen";
import {EventScreen} from "./screens/EventScreen";

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
    const EventStackNavigator = createNativeStackNavigator<RootStackParamList>();
    const MainTab = createBottomTabNavigator<RootStackParamList>();

    function EventStack() {
        return (
            <>
                <RootStack.Navigator initialRouteName="EventsScreen">
                    <RootStack.Screen options={{title: 'Les évènements'}} name="EventsScreen" component={EventsScreen}/>
                    <RootStack.Screen options={{title: 'L\'évènement en détail'}} name="EventScreen" component={EventScreen}/>
                </RootStack.Navigator>
            </>
        )
    }


    function MainStack() {
        const {data, isFetching, isLoading} = useGetCurrentProfileQuery();

        return (
            <MainTab.Navigator initialRouteName="EventsStack">

                {(!isLoading && !data) ? <>
                        <RootStack.Screen name="CreateProfileScreen" component={CreateProfileScreen}/>
                    </> :
                    <>
                        <MainTab.Screen name="EventsStack" component={EventStack}
                                        options={{
                                            headerShown: false,
                                            tabBarLabel: "Événements",
                                            tabBarIcon: () => (
                                                <MaterialIcons name="event-note" size={24} color="black"/>
                                            ),
                                        }}
                        />
                        <MainTab.Screen name="EventCreationScreen" component={EventCreationScreen}/>

                        <MainTab.Screen name="ProfilScreen" component={ProfileScreen} options={{
                            title: 'Profil',
                            tabBarLabel: "Profil",
                            tabBarIcon: () => (
                                <MaterialCommunityIcons name="account" size={24} color="black"/>
                            ),
                        }}
                        />
                    </>}

            </MainTab.Navigator>
        )
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <RootStack.Navigator>
                    {session && session.user ?
                        <>
                            <RootStack.Screen options={{headerShown: false}} name="MainStack" component={MainStack}/>
                        </>
                        : (<>
                            <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
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
