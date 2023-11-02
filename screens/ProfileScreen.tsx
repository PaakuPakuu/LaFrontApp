import {useGetCurrentProfileQuery, useGetUserEventsQuery} from "../store/supabaseApi";
import {View, Text, FlatList, TouchableOpacity, Alert} from "react-native";
import {Instrument} from "../components/Profile/Instrument";
import {ProfileEvents} from "../components/Profile/ProfileEvents";
import {supabase} from "../supabaseConfig";

export default function () {
    const {data, isFetching, isLoading} = useGetCurrentProfileQuery();

    async function logOut() {
        const { error } = await supabase.auth.signOut()

        if (error) Alert.alert('Apparemment tu peux pas te déco, mais c\'est pas grave non ?')
    }

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
                    <Instrument instrument={item}/>
                }
            />

            <ProfileEvents/>

            <TouchableOpacity
            onPress={() => logOut()}
            >
                <Text>Log out</Text>
            </TouchableOpacity>

        </View>}
    </>)
}