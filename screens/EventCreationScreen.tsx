import {Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {useCreateEventMutation} from "../store/supabaseApi";
import {useState} from "react";
import {EventType} from "../models/EventType";

export function EventCreationScreen() {
    const tempData: EventType = {
        title: "Generated",
        date: new Date().toDateString(),
        description: "Description de ouf guedin",
        address: "test",
        picture: "https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive.jpg",
        creator: 'f9d33be5-ccc0-4540-9358-5562abcc932a',
        created_at: new Date().toString()
    }

    const [createEvent, {isLoading}] = useCreateEventMutation()

    return (
        <>
            <TouchableOpacity onPress={async () => {
                createEvent(tempData)
            }}>
                <Text>
                    Lol je créé
                </Text>
            </TouchableOpacity>

            {isLoading ?? <Text>Loading</Text>}

        </>
    )
}

const STYLES = StyleSheet.create({
    textInput: {
        borderWidth: 1,
    }
})