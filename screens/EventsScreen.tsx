import { FlatList, View, Text, StyleSheet } from "react-native";

import { useFetchAllEventsQuery, useGetCurrentProfileQuery } from "../store/supabaseApi";
import { EventItem } from "../components/Events/EventItem";
import { EventCard } from "../components/Events/EventCard";
import { EditProfileModal } from "../components/editProfileModal/EditProfileModal";
import { useEffect, useState } from "react";

export function EventsScreen() {
    const { data: events, isLoading, isError } = useFetchAllEventsQuery();
    const { data: profile } = useGetCurrentProfileQuery();

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (!profile) {
            setModalVisible(true);
        }
    }, [profile]);

    return (
        <View style={styles.container}>
            <EditProfileModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                profile={profile}
            />

            {!isLoading && events && (
                <>
                    <EventCard event={events[0]} />
                    <FlatList
                        data={events.slice(1)}
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
            {(!events || isError) && <Text>Aucun évènement</Text>}
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