import {supabase} from "../supabaseConfig";
import {Alert, Button, StyleSheet, TextInput, View} from "react-native";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {MainTabParamList} from "../App";
import {ProfileType} from "../models/ProfileType";

export function SignInScreen() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [profileData, setProfileData] = useState<ProfileType>({
        created_at: new Date().toString(),
        firstname: "",
        instruments: undefined,
        lastname: "",
        nickname: "",
        user: null
    });

    const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();

    async function signUpWithEmail() {

        setLoading(true)
        const {
            data: {session},
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)


        if (!session) Alert.alert('Please check your inbox for email verification!')

        if (error) {
            Alert.alert(error.message);
        } else {
            Alert.alert('Inscription réussie! Veuillez saisir les informations supplémentaires.');

            navigation.navigate('InfosProfilScreen');
        }
        setLoading(false)
    }

    function handleTextChange() {

    }


    return (
        <>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Mot de passe"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setProfileData(prevState => ({...prevState, firstname: value}))}
                    value={profileData.firstname || ''}
                    secureTextEntry={true}
                    placeholder="Prénom"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setProfileData(prevState => ({...prevState, firstname: value}))}
                    value={profileData.lastname || ''}
                    secureTextEntry={true}
                    placeholder="Nom de famille"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setProfileData(prevState => ({...prevState, firstname: value}))}
                    value={profileData.nickname || ''}
                    secureTextEntry={true}
                    placeholder="Surnom"
                    autoCapitalize={'none'}
                />
            </View>

            <Button title="S'inscrire" disabled={loading} onPress={() => signUpWithEmail()}/>
        </>
    )
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
