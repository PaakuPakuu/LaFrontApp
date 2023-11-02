import {FlatList, Text, View} from "react-native";
import {useFetchAllCommentariesPerEventQuery} from "../../store/supabaseApi";
import {Instrument} from "../Profile/Instrument";

type Props = {
    eventId: string
}

export function EventComments({eventId}: Props) {
    const {data, isFetching, isLoading} = useFetchAllCommentariesPerEventQuery(eventId);


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

        </>
    )
}