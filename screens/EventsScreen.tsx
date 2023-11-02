import { FlatList, View, Text, StyleSheet } from "react-native";
import { EventCard } from "../components/Events/EventCard";

import { useFetchAllEventsQuery } from "../store/supabaseApi";
import { EventItem } from "../components/Events/EventItem";

export function EventsScreen() {
    const { data, isFetching, isLoading, isError } = useFetchAllEventsQuery();

    return (
        <View style={styles.container}>
            {!isLoading && data && (
                <>
                    <FlatList
                        data={data}
                        numColumns={1}
                        renderItem={({ item }) =>
                            <EventCard event={item} />
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

const styles = StyleSheet.create({
    container: {
        padding: 16,
    }
});