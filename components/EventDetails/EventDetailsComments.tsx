import {Alert, Button, FlatList, StyleSheet, Text, TextInput, View} from "react-native";
import {
    useAddCommentMutation,
    useFetchAllCommentariesPerEventQuery, useGetCurrentProfileQuery
} from "../../store/supabaseApi";
import React, {useState} from "react";
import {supabase} from "../../supabaseConfig";
import {TablesInsert, UserEvent} from "../../models/customModels";
import {EventDetailsComment} from "./EventDetailsComment";

type Props = {
    event: UserEvent;
}

export function EventDetailsComments({event}: Props) {
    const {data, isLoading} = useFetchAllCommentariesPerEventQuery(event.id);
    const {data: profile} = useGetCurrentProfileQuery();


    const [commentData, setCommentData] = useState<TablesInsert<"Comment">>({
        created_at: ((new Date()).toISOString()).toLocaleString(),
        event: event.id,
        text: ""
    });

    const [addComment] = useAddCommentMutation()

    async function handleCreateComment(commentData: TablesInsert<"Comment">) {
        if (profile?.id) {
            commentData.author = profile.id;
            commentData.created_at = ((new Date()).toISOString()).toLocaleString()

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
                style={styles.commentWrapper}
                data={data}
                renderItem={({item}) =>
                    <EventDetailsComment comment={item}/>
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
    commentWrapper: {
        paddingLeft: 5,
        paddingRight: 5,
    },
})