import {useGetCurrentProfileQuery, useGetUserEventsQuery} from "../store/supabaseApi";
import {View, Text, FlatList, TouchableOpacity, Alert, Button, Image, StyleSheet} from "react-native";
import {Instrument} from "../components/Profile/Instrument";
import {ProfileEvents} from "../components/Profile/ProfileEvents";
import {supabase} from "../supabaseConfig";
import React from "react";

export default function () {
    const {data, isFetching, isLoading} = useGetCurrentProfileQuery();

    async function logOut() {
        const {error} = await supabase.auth.signOut()

        if (error) Alert.alert('Apparemment tu peux pas te déco, mais c\'est pas grave non ?')
    }

    return (<>
        {!isLoading && data && <View style={styles.container}>
            <View style={styles.mainContainer}>
                <Image source={{uri: "https://placehold.co/80x80/png"}} style={styles.picture}/>
                <View style={styles.nameContainer}>
                    <Text style={styles.nickname}>
                        {data.nickname}
                    </Text>
                    <Text>
                        {data.firstname}{data.lastname}
                    </Text>
                </View>

            </View>

            <FlatList
                data={data.instruments}
                renderItem={({item}) =>
                    <Instrument instrument={item}/>
                }
            />

            <ProfileEvents/>

            <Button title="Déconnexion" disabled={isLoading} onPress={async () => logOut()}/>
        </View>}
    </>)
}

const styles = StyleSheet.create({
    picture: {
        width: 80,
        height: 80,
        borderRadius: 40

    },
    container: {
        padding: 15
    },
    mainContainer: {
        flexDirection: 'row'
    },
    nameContainer: {
        flexDirection: 'column',
        marginLeft: 15
    },
    nickname: {
        fontSize: 18
    }
});