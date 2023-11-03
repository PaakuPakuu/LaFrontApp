import { FlatList, View, Text, StyleSheet, RefreshControl } from "react-native";

import { supabaseApi, useFetchAllEventsQuery, useGetCurrentProfileQuery } from "../store/supabaseApi";
import { EventItem } from "../components/Events/EventItem";
import { EventCard } from "../components/Events/EventCard";
import { EditProfileModal } from "../components/editProfileModal/EditProfileModal";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { supabase } from "../supabaseConfig";

export function EventsScreen() {
    const { data: events, isError, isFetching: isEventFetching, refetch } = useFetchAllEventsQuery();
    const { data: profile, isFetching: isProfileFetching } = useGetCurrentProfileQuery();

    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!profile && !isProfileFetching) {
            setModalVisible(true);
        }
    }, [profile, isProfileFetching]);

    return (
        <View style={styles.container}>
            <EditProfileModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                profile={profile}
            />

            {!isEventFetching && events && (
                <>
                    <EventCard event={events[0]} />
                    <FlatList
                        data={events.slice(1)}
                        numColumns={1}
                        renderItem={({ item }) =>
                            <EventItem event={item} />
                        }
                        keyExtractor={item => item.id.toString()}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={() => refetch()} />
                        }
                        style={styles.list}
                    />
                </>)
            }
            {isEventFetching && <View>
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