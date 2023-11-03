import { FlatList, View, Text, StyleSheet } from "react-native";
import { EventCard } from "../components/Events/EventCard";

import { useFetchAllEventsQuery } from "../store/supabaseApi";

export function EventsScreen() {
    const { data, isFetching, isLoading, isError } = useFetchAllEventsQuery();

    if (data) {
        console.log(data[2].participations);
    }

    return (
        <View style={styles.container}>
            {!isLoading && data && (
                <>
                    <FlatList
                        data={data.slice(1)}
                        numColumns={1}
                        renderItem={({ item }) =>
                            <EventCard event={item} />
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