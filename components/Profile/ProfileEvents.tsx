import {FlatList, StyleSheet, Text, View} from "react-native";
import {useGetUserEventsQuery} from "../../store/supabaseApi";
import {ProfileEvent} from "./ProfileEvent";

export function ProfileEvents() {
    const {data, isFetching, isLoading} = useGetUserEventsQuery();

    return (<View>

        <Text style={styles.mainTitle}>
            Vos évènements
        </Text>

        {data && !isLoading &&
            <FlatList data={data} renderItem={({item}) =>
                <ProfileEvent event={item} />
            }/>

        }

    </View>)
}

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: 18,
        paddingTop: 20,
        paddingBottom: 12
    }

})