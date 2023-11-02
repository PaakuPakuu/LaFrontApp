import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { StackType } from "../App";

type Props = NativeStackNavigationProp<StackType>;
const ProfilScreen = () => {
  const navigation = useNavigation<Props>();

  const handleSignUpButtonPress = () => {
    navigation.navigate("SignUpScreen");
  };

  return (
    <View>
        <TouchableOpacity 
         onPress={() => navigation.navigate('SignUpScreen')} >
            <Button title="s'inscrire"/>
         </TouchableOpacity>


      {/* <Button title="S'inscrire" onPress={handleSignUpButtonPress} /> */}
      <Button title="Se connecter" onPress={() => navigation.navigate("SignInScreen")} />
      {/* Ajoutez d'autres éléments pour gérer la déconnexion */}
    </View>
  );
};

export default ProfilScreen;
