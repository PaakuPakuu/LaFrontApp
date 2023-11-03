import {Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {
    useAddCommentMutation,
    useCreateEventMutation,
    useFetchAllCommentariesPerEventQuery
} from "../../store/supabaseApi";
import React, {useState} from "react";
import {Tables, TablesInsert} from "../../database.types";
import {supabase} from "../../supabaseConfig";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {MainTabParamList} from "../../App";

type Props = {
    eventId: number
}

export function EventDetailsComments({eventId}: Props) {
    const {data, isLoading} = useFetchAllCommentariesPerEventQuery(eventId);

    const [commentData, setCommentData] = useState<TablesInsert<"Comment">>({
        author: "",
        created_at: new Date().toDateString(),
        event: eventId,
        text: ""
    });

    const [addComment] = useAddCommentMutation()
    const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();

    async function handleCreateComment(commentData: TablesInsert<"Comment">) {
        const {data: {user}} = await supabase.auth.getUser()
        if (user?.id) {

            commentData.author = user.id.toString();

            await addComment(commentData).then(
                () => {
                    commentData.text = '';
                }
            )


        } else {
            console.log('wtf')
            Alert.alert('Euh wtf ?')
        }
    }

    return (
        <>
            <Text style={{textAlign: 'center', fontSize: 24}}>
                Commentaires :
            </Text>

            <FlatList
                data={data}
                renderItem={({item}) =>
                    <View>
                        <Text>{new Date(item.created_at).toDateString()} | {item.author} :</Text>
                        <Text>{item.text}</Text>
                    </View>
                }
            />

            <View style={styles.horizontallySpaced}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setCommentData(prevState => ({...prevState, text: value}))}
                    value={commentData.text || ''}
                    placeholder="Votre commmentaire"
                    autoCapitalize={'sentences'}
                />

                <Button title="Commenter" disabled={isLoading} onPress={async () => handleCreateComment(commentData)}/>
            </View>

        </>
    )
}


const styles = StyleSheet.create({
    horizontallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        flexDirection: "row"
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 55,
        height: 40,
        width: 250,
        alignSelf: 'center',
    },
})