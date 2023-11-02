import {FlatList, Text, View} from "react-native";
import {EventType} from "../../models/EventType"
import {useGetUserEventsQuery} from "../../store/supabaseApi";

export function ProfileEvents() {
    const {data, isFetching, isLoading} = useGetUserEventsQuery();

    return (<>

        <Text>
            Vos évènements
        </Text>

        {data &&

            <FlatList data={data} renderItem={({item}) =>
                <View>
                    <Text>{item.title}</Text>
                    <Text>{item.category}</Text>
                    <Text>{item.address}</Text>
                    <Text>{new Date(item.date).toDateString()}</Text>
                </View>
            }/>

        }

    </>)
}