import {Text, TextInput, TouchableOpacity, StyleSheet, View, Button, Alert} from 'react-native';
import {useCreateEventMutation} from "../store/supabaseApi";
import {Tables, TablesInsert} from "../database.types";
import React, {useState} from "react";
import {supabase} from "../supabaseConfig";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {MainTabParamList} from "../App";
import {RadioButton} from "react-native-paper";

export function EventCreationScreen() {
    const [eventData, setEventData] = useState<TablesInsert<"Event">>({
        created_at: new Date().toString(),
        address: "",
        description: "",
        title: "",
        user: "",
        category: 'contract',
        date: new Date().toString(),
        picture: "",
    });

    const [createEvent, {isLoading}] = useCreateEventMutation()
    const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();

    async function handleCreateEvent(eventData: TablesInsert<"Event">) {
        const {data: {user}} = await supabase.auth.getUser()

        if (user) {
            setEventData(prevState => ({...prevState, user: user.id}))

            await createEvent(eventData);

            if (!isLoading) {
                navigation.navigate('MainStack', {screen: 'EventsScreen'})
            }
        } else {
            Alert.alert('Euh wtf ?')
        }
    }

    return (
        <>
            <View style={styles.verticallySpaced}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setEventData(prevState => ({...prevState, address: value}))}
                    value={eventData.address || ''}
                    placeholder="Adresse"
                    autoCapitalize={'words'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setEventData(prevState => ({...prevState, description: value}))}
                    value={eventData.description || ''}
                    placeholder="Description"
                    autoCapitalize={'words'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setEventData(prevState => ({...prevState, title: value}))}
                    value={eventData.title || ''}
                    placeholder="Titre"
                    autoCapitalize={'words'}
                />
            </View>

            <Button title="Je créé mon profile" disabled={isLoading} onPress={async () => handleCreateEvent(eventData)}/>

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