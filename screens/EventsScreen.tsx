import {FlatList, View, Text, TouchableOpacity} from "react-native";
import {EventCard} from "../components/Events/EventCard";

import {useFetchAllEventsQuery} from "../store/supabaseApi";
import {useNavigation} from "@react-navigation/native";

export function EventsScreen() {
    const {data, isFetching, isLoading} = useFetchAllEventsQuery();
    const navigation = useNavigation();

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

            <TouchableOpacity
                style={{backgroundColor: 'blue'}}
                onPress={() => navigation.navigate('EventCreationScreen')}
            >
                <Text>Créer un évènement</Text>
            </TouchableOpacity>
        </View>
    )
}