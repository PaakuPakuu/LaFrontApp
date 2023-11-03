import { FlatList, StyleSheet, Text, View } from "react-native";
import { useGetUserEventsQuery } from "../../store/supabaseApi";
import { EventItem } from "../Events/EventItem";

export function ProfileEvents() {
    const { data: events, isLoading } = useGetUserEventsQuery();

    return (<View>

        <Text style={styles.mainTitle}>
            Vos évènements
        </Text>

        {!isLoading && events && (
            events.map((event, index) => (
                <EventItem key={`event-${index}`} event={event} />
            ))
        )}

    </View>)
}

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: 24,
        paddingTop: 20,
        paddingBottom: 12
    }

})