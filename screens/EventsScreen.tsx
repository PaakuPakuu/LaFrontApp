import { FlatList, View, Text } from "react-native";
import { EventCard } from "../components/Events/EventCard";

import { useFetchAllEventsWithParticipationsQuery } from "../store/supabaseApi";
import { EventItem } from "../components/Events/EventItem";

export function EventsScreen() {
    const { data, isFetching, isLoading, isError } = useFetchAllEventsWithParticipationsQuery();

    return (
        <View>
            {!isLoading && data && (
                <>
                    <EventCard event={data[0]} />
                    <FlatList
                        data={data}
                        numColumns={1}
                        renderItem={({ item }) =>
                            <EventItem event={item} />
                        }
                        keyExtractor={item => item.id.toString()}
                    />
                </>)
            }
            {isLoading && <View>
                <Text>Chargement...</Text>
            </View>}
            {(!data || isError) && <Text>Aucun évènement</Text>}
        </View>
    )
}