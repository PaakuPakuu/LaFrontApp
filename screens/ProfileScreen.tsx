import { supabaseApi, useGetCurrentProfileQuery } from "../store/supabaseApi";
import { View, Text, FlatList, Alert, Button, Image, StyleSheet, ScrollView } from "react-native";
import { Instrument } from "../components/Profile/Instrument";
import { ProfileEvents } from "../components/Profile/ProfileEvents";
import { supabase } from "../supabaseConfig";
import { useState } from "react";
import { EditProfileModal } from "../components/editProfileModal/EditProfileModal";
import { useAppDispatch } from "../hooks";

export default function () {
    const { data: profile, isFetching } = useGetCurrentProfileQuery();

    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useAppDispatch()

    async function logOut() {
        const { error } = await supabase.auth.signOut()

        if (error) Alert.alert('Apparemment tu peux pas te déco, mais c\'est pas grave non ?')

        dispatch(supabaseApi.util.invalidateTags(['Profile']));
    }

    return (
        <>
            {!isFetching && profile &&
                <ScrollView style={styles.container}>
                    <View style={styles.mainContainer}>
                        <EditProfileModal
                            visible={modalVisible}
                            onClose={() => setModalVisible(false)}
                            profile={profile}
                        />

                        <Image source={{ uri: "https://placehold.co/80x80/png" }} style={styles.picture} />
                        <View style={styles.topContainer}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nickname}>
                                    {profile.nickname}
                                </Text>
                                <Text>
                                    {profile.firstname} {profile.lastname}
                                </Text>
                            </View>
                            <Button title="Éditer" onPress={() => setModalVisible(true)} />
                        </View>

                    </View>

                    <View>
                        {profile.instruments?.map((instrument, index) => <Instrument key={`instrument-${index}`} instrument={instrument} />)}
                    </View>


                    <ProfileEvents />

                    <Button title="Déconnexion" disabled={isFetching} onPress={async () => logOut()} color="red" />
                </ScrollView>
            }
        </>
    );
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
        flexDirection: 'row',
        marginBottom: 16
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nameContainer: {
        flexDirection: 'column',
        marginLeft: 15
    },
    nickname: {
        fontSize: 18
    },
});