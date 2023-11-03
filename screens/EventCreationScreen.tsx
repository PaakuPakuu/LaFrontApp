import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import format from 'date-fns/format';
import React, { useState } from "react";
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { EventStackParamList } from "../App";
import { useAppNavigation } from '../hooks';
import { TablesInsert } from '../models/customModels';
import { useCreateEventMutation } from "../store/supabaseApi";
import { supabase } from "../supabaseConfig";

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


    const [createEvent, { isLoading }] = useCreateEventMutation()
    const navigation = useAppNavigation<EventStackParamList>();

    async function handleCreateEvent(eventData: TablesInsert<"Event">) {
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {

            eventData.user = user.id.toString();

            await createEvent(eventData).then(
                () => {
                    navigation.navigate("EventsScreen");
                }
            )
        } else {
            Alert.alert('Euh wtf ?')
        }
    }

    return (
        <SafeAreaView>

            <View style={styles.verticallySpaced}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setEventData(prevState => ({ ...prevState, title: value }))}
                    value={eventData.title || ''}
                    placeholder="Titre"
                    autoCapitalize={'words'}
                />
            </View>

            <View style={styles.verticallySpaced}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setEventData(prevState => ({ ...prevState, address: value }))}
                    value={eventData.address || ''}
                    placeholder="Adresse"
                    autoCapitalize={'words'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setEventData(prevState => ({ ...prevState, description: value }))}
                    value={eventData.description || ''}
                    placeholder="Description"
                    autoCapitalize={'words'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput
                    style={styles.input}
                    value={eventData.category}
                />
                <Picker
                    style={styles.picker}
                    selectedValue={eventData.category}
                    onValueChange={(value: any) =>
                        setEventData((prevState) => ({ ...prevState, category: value }))
                    }>
                    <Picker.Item label="Contract" value="contract" />
                    <Picker.Item label="Busk" value="busk" />
                    <Picker.Item label="Internal" value="internal" />
                </Picker>
            </View>
            <View style={styles.verticallySpaced}>
                <Text style={styles.textDate}>Sélectionnez une date</Text>
                <DateTimePicker
                    style={styles.date}
                    value={new Date(eventData.date)}
                    mode="datetime"
                    onChange={(event, selectedDate) => {
                        if (selectedDate) {
                            const formattedDate = format(selectedDate, 'yyyy-MM-dd HH:mm:ss');
                            setEventData((prevState) => ({ ...prevState, date: formattedDate }));
                        }
                    }
                    }
                />
            </View>

            <View style={styles.button}>
                <Button
                    title="Créer l'Event"
                    disabled={isLoading}
                    color="black"
                    onPress={async () => handleCreateEvent(eventData)} />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 10,
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

    date: {
        position: 'relative',
        bottom: 60,
        marginRight: 5,
    },

    textDate: {
        position: 'relative',
        bottom: 35,
        marginLeft: 5,
    },

    button: {
        backgroundColor: 'lightgray',
        borderRadius: 30,
        padding: 10,
        color: 'white',
        margin: 10,
    },

    picker: {
        position: 'relative',
        bottom: 50,
    }
})