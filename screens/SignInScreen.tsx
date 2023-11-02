import { StatusBar } from "expo-status-bar";

import React, { useState } from "react";

import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import * as AuthService from '../auth/AuthService';


export default function SignUP() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        try {
            const user = await AuthService.login(email, password);
            console.log("Utilisateur connecté :", user);
        } catch (error) {
            console.error("Erreur de connexion :", error);
        }
    };
 
    const handleResetPassword = async () => {
        try {
            const user = await AuthService.resetPassword(email);
            console.log("mail is send to reset :", user);
        } catch (error) {
            console.error("Error in reset password :", error);
        }
    };

    return (
            <View style={styles.container}>
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
                <TouchableOpacity style={styles.loginBtn} onPress={handleResetPassword}>
                    <Text style={styles.forgot_button}>Forgot Password?</Text>
                </TouchableOpacity>
                    <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
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
