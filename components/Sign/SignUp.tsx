import { StatusBar } from "expo-status-bar";

import React, { useState } from "react";

import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import * as AuthService from '../../auth/AuthService';


export default function SignUP() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            const user = await AuthService.signup(email, password);
            console.log("Utilisateur connecté :", user);
        } catch (error) {
            console.error("Erreur de connexion :", error);
        }
    };

    return (
            <View style={styles.container}>
                <Image style={styles.image} source={require("../../assets/favicon.png")} />
                <StatusBar style="auto" />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email."
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => setEmail(email)} />
                </View>

                <View style={styles.inputView}>

                    <TextInput

                        style={styles.TextInput}

                        placeholder="Password."

                        placeholderTextColor="#003f5c"

                        secureTextEntry={true}

                        onChangeText={(password) => setPassword(password)} />

                </View>

                <TouchableOpacity>

                    <Text style={styles.forgot_button}>Forgot Password?</Text>

                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.loginBtn}>

                    <Text style={styles.loginText}>LOGIN</Text>

                </TouchableOpacity> */}
                    <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
                        <Text style={styles.loginText}>SIGN UP</Text>
                    </TouchableOpacity>

            </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
    },

    loginText: {
        textAlign: "center",
    },

    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },

});
