import {Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {useCreateEventMutation} from "../store/supabaseApi";
import {Tables} from "../database.types";

export function EventCreationScreen() {
    const tempData: Tables<"Event"> = {
        title: "Generated",
        date: new Date().toDateString(),
        description: "Description de ouf guedin",
        address: "test",
        picture: "https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive.jpg",
        created_at: new Date().toString(),
        category: 'contract',
        user: '',
        id: 0
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