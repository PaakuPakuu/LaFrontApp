import {FlatList, View, Text} from "react-native";
import {EventCard} from "../components/Events/EventCard";

import {useFetchAllEventsQuery} from "../store/supabaseApi";

export function EventsScreen() {
    const {data, isFetching, isLoading} = useFetchAllEventsQuery();

    return (
        <View>
            {!isLoading && <FlatList
                data={data}
                numColumns={1}
                renderItem={({item}) =>
                    <EventCard {...item} />
                }
                keyExtractor={item => item.id.toString()}
            />
            }
        </View>
    )
}