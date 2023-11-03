import {FlatList, View, Text, StyleSheet, RefreshControl} from "react-native";

import {supabaseApi, useFetchAllEventsQuery} from "../store/supabaseApi";
import {EventItem} from "../components/Events/EventItem";
import {EventCard} from "../components/Events/EventCard";
import {useAppDispatch} from "../hooks";
import {supabase} from "../supabaseConfig";
import {useState} from "react";

export function EventsScreen() {
    const {data, isFetching, isLoading, isError, refetch} = useFetchAllEventsQuery();
    const dispatch = useAppDispatch()
    const [refreshing, setRefreshing] = useState(false);

    return (
        <View style={styles.container}>
            {!isLoading && data && (
                <>
                    <EventCard event={data[0]}/>
                    <FlatList
                        data={data.slice(1)}
                        numColumns={1}
                        renderItem={({item}) =>
                            <EventItem event={item}/>
                        }
                        keyExtractor={item => item.id.toString()}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={() => refetch()}/>
                        }
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