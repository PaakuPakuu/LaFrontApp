import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { supabase } from "../supabaseConfig";
import { useCreateProfileMutation } from "../store/supabaseApi";
import { EventStackParamList, MainTabParamList } from "../App";
import { TablesInsert } from "../models/customModels";
import { useAppNavigation } from "../hooks";

export function CreateProfileScreen() {
    const navigation = useAppNavigation<MainTabParamList>();

    const [profileData, setProfileData] = useState<TablesInsert<"Profile">>({
        created_at: new Date().toString(),
        firstname: "",
        instruments: null,
        lastname: "",
        nickname: "",
        user: ""
    });

    const [createProfile, { isLoading }] = useCreateProfileMutation()

    async function handleCreateProfile(profileData: TablesInsert<"Profile">) {
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {

            profileData.user = user.id.toString();

            await createProfile(profileData)
                .then(() => {
                    navigation.navigate("EventsStack");
                })

        } else {
            Alert.alert('Euh wtf ?')
        }
    }

    return (<>
        <View style={styles.verticallySpaced}>
            <TextInput
                style={styles.input}
                onChangeText={(value) => setProfileData(prevState => ({ ...prevState, firstname: value }))}
                value={profileData.firstname || ''}
                placeholder="Prénom"
                autoCapitalize={'words'}
            />
        </View>
        <View style={styles.verticallySpaced}>
            <TextInput
                style={styles.input}
                onChangeText={(value) => setProfileData(prevState => ({ ...prevState, lastname: value }))}
                value={profileData.lastname || ''}
                placeholder="Nom de famille"
                autoCapitalize={'words'}
            />
        </View>
        <View style={styles.verticallySpaced}>
            <TextInput
                style={styles.input}
                onChangeText={(value) => setProfileData(prevState => ({ ...prevState, nickname: value }))}
                value={profileData.nickname || ''}
                placeholder="Surnom"
                autoCapitalize={'words'}
            />
        </View>

        <Button title="Je créé mon profile" disabled={isLoading} onPress={() => handleCreateProfile(profileData)} />
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