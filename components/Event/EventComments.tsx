import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {
    useAddCommentMutation,
    useCreateEventMutation,
    useFetchAllCommentariesPerEventQuery
} from "../../store/supabaseApi";
import {Instrument} from "../Profile/Instrument";
import {EventType} from "../../models/EventType";
import {CommentType} from "../../models/CommentType";

type Props = {
    eventId: number
}

export function EventComments({eventId}: Props) {
    const {data, isFetching, isLoading} = useFetchAllCommentariesPerEventQuery(eventId);

    const tempData: CommentType = {
        author: 'f9d33be5-ccc0-4540-9358-5562abcc932a',
        created_at: new Date().toString(),
        event: eventId,
        text: 'caca'
    }

    const [addComment] = useAddCommentMutation()


    return (
        <>
            <Text>
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

            <TouchableOpacity
                onPress={async () => {
                    addComment(tempData)
                }}
            >
                <Text>Ajouter commmentaire</Text>
            </TouchableOpacity>

        </>
    )
}