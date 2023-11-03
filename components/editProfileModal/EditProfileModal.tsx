import { useEffect, useState } from "react";
import { Alert, Button, Modal, SafeAreaView, StyleSheet, TextInput, View, Text } from "react-native";
import { Profile, TablesInsert } from "../../models/customModels";
import { supabase } from "../../supabaseConfig";
import { useUpsertProfileMutation } from "../../store/supabaseApi";

interface Props {
    profile?: Profile;
    visible: boolean;
    onClose: () => void;
}

export const EditProfileModal = ({ profile, visible, onClose }: Props) => {
    const initialProfileData = profile || {
        created_at: new Date().toString(),
        firstname: "",
        instruments: null,
        lastname: "",
        nickname: "",
        user: ""
    }

    const [profileData, setProfileData] = useState<TablesInsert<"Profile">>(initialProfileData);

    const [createProfile, { isLoading, isSuccess }] = useUpsertProfileMutation();

    async function handleCreateProfile(profileData: TablesInsert<"Profile">) {
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            profileData.user = user.id.toString();
            await createProfile(profileData);
        } else {
            Alert.alert('Euh wtf ?')
        }
    }

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess]);

    return (
        <Modal
            animationType="slide"
            visible={visible}
        >
            <SafeAreaView>
                <Text style={styles.title}>
                    {profile ? "Modification" : "Nouveau profil"}
                </Text>

                <View style={styles.verticallySpaced}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => setProfileData(prevState => ({ ...prevState, firstname: value }))}
                        value={profileData.firstname || ''}
                        placeholder="Prénom"
                        autoCapitalize={'words'}
                    />
                </View>
                <View style={styles.verticallySpaced}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => setProfileData(prevState => ({ ...prevState, lastname: value }))}
                        value={profileData.lastname || ''}
                        placeholder="Nom de famille"
                        autoCapitalize={'words'}
                    />
                </View>
                <View style={styles.verticallySpaced}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => setProfileData(prevState => ({ ...prevState, nickname: value }))}
                        value={profileData.nickname || ''}
                        placeholder="Surnom"
                        autoCapitalize={'words'}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    {profile && <Button title="Annuler" onPress={onClose} />}
                    <Button title={profile ? "Modifier le profil" : "Créer mon profil"} disabled={isLoading} onPress={() => handleCreateProfile(profileData)} />
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 55,
        height: 40,
        width: 330,
        alignSelf: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
        gap: 16,
    },
})