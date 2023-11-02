import {useGetCurrentProfileQuery, useGetUserEventsQuery} from "../store/supabaseApi";
import {View, Text, FlatList} from "react-native";
import {Instrument} from "../components/Profile/Instrument";
import {ProfileEvents} from "../components/Profile/ProfileEvents";

export default function () {
    const {data, isFetching, isLoading} = useGetCurrentProfileQuery();


    return (<>
        {!isLoading && data && <View>
            <Text>
                {data.nickname}
            </Text>
            <Text>
                {data.firstname} {data.lastname}
            </Text>

            <FlatList
                data={data.instruments}
                renderItem={({item}) =>
                    <Instrument instrument={item} />
                }
            />

            <ProfileEvents />

        </View>}
    </>)
}