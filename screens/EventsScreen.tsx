import { FlatList, View, Text, StyleSheet } from "react-native";

import { useFetchAllEventsQuery } from "../store/supabaseApi";
import { EventItem } from "../components/Events/EventItem";
import { EventCard } from "../components/Events/EventCard";

export function EventsScreen() {
    const { data, isFetching, isLoading, isError } = useFetchAllEventsQuery();

    return (
        <View style={styles.container}>
            {!isLoading && data && (
                <>
                    <EventCard event={data[0]} />
                    <FlatList
                        data={data.slice(1)}
                        numColumns={1}
                        renderItem={({ item }) =>
                            <EventItem event={item} />
                        }
                        keyExtractor={item => item.id.toString()}
                        style={styles.list}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    list: {
        flex: 1,
        marginTop: 8,
    }
});