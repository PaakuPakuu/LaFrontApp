import { supabase } from "../supabaseConfig";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainTabParamList, RootStackParamList } from "../App";
import { useAppNavigation } from "../hooks";

export function SignInScreen() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const navigation = useAppNavigation<RootStackParamList>();

    async function signUpWithEmail() {

        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)

        if (!session) Alert.alert('Regarde ta boîte mail pour valider ton adresse !')

        if (error) {
            Alert.alert(error.message);
        } else {
            navigation.navigate('LoginScreen');
        }
        setLoading(false)
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

            <Button title="S'inscrire" disabled={loading} onPress={() => signUpWithEmail()} />
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
