import {Alert, Button, StyleSheet, TextInput, View} from "react-native";
import React, {useState} from "react";
import {Tables} from "../database.types";
import {supabase} from "../supabaseConfig";
import {useCreateEventMutation, useCreateProfileMutation} from "../store/supabaseApi";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {MainTabParamList} from "../App";

export function CreateProfileScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();

    const [profileData, setProfileData] = useState<Tables<"Profile">>({
        created_at: new Date().toString(),
        firstname: "",
        instruments: null,
        lastname: "",
        nickname: "",
        user: ""
    });

    const [createProfile, {isLoading}] = useCreateProfileMutation()

    async function handleCreateProfile(profileData: Tables<"Profile">) {
        const {data: {user}} = await supabase.auth.getUser()

        if (user) {
            setProfileData(prevState => ({...prevState, user: user.id}))

            await createProfile(profileData);

            console.log('étape 1')

            if (!isLoading) {
                console.log('étape 2')

                navigation.navigate('MainStack', {screen: 'EventsScreen'})
            }
        } else {
            Alert.alert('Euh wtf ?')
        }


    }

    return (<>
        <View style={styles.verticallySpaced}>
            <TextInput
                style={styles.input}
                onChangeText={(value) => setProfileData(prevState => ({...prevState, firstname: value}))}
                value={profileData.firstname || ''}
                placeholder="Prénom"
                autoCapitalize={'words'}
            />
        </View>
        <View style={styles.verticallySpaced}>
            <TextInput
                style={styles.input}
                onChangeText={(value) => setProfileData(prevState => ({...prevState, lastname: value}))}
                value={profileData.lastname || ''}
                placeholder="Nom de famille"
                autoCapitalize={'words'}
            />
        </View>
        <View style={styles.verticallySpaced}>
            <TextInput
                style={styles.input}
                onChangeText={(value) => setProfileData(prevState => ({...prevState, nickname: value}))}
                value={profileData.nickname || ''}
                placeholder="Surnom"
                autoCapitalize={'words'}
            />
        </View>

        <Button title="Je créé mon profile" disabled={isLoading} onPress={() => handleCreateProfile(profileData)}/>
    </>)
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 55,
        height: 40,
        width: 330,
        alignSelf: 'center',
    },
})