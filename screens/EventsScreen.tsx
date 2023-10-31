import {FlatList} from "react-native";
import {EventCard} from "../components/Events/EventCard";
import {TypeEvent} from "../models/TypeEvent";
import {EnumEventCategory} from "../enums/EnumEventCategory";
import {useFetchAllEventsQuery} from "../store/firestoreApi";

export function EventsScreen() {
    const {data, isFetching, isLoading} = useFetchAllEventsQuery();

    return (
        <>
            {!isLoading && <FlatList
            data={data}
            numColumns={1}
            renderItem={({item}) =>
                <EventCard {...item} />
            }
            keyExtractor={item => item.id.toString()}
        >

        </FlatList>}

        </>
    )
}

const PAUL = {
    id: 'rgre',
    name: 'Paul',
    emailAddress: 'lol',
    nickname: 'popol',
    avatar: 'lolilol',
    password: '1243456'
}