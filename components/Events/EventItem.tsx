import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useGetCurrentProfileQuery } from "../../store/supabaseApi";
import { Feather } from "@expo/vector-icons";
import { UserEvent } from "../../models/customModels";
import { useAppNavigation } from "../../hooks";
import { CategoryBadge } from "../badge/CategoryBadge";
import { EventStackParamList } from "../../App";

interface Props {
    event: UserEvent;
}

export const EventItem = ({ event }: Props) => {
    const navigation = useAppNavigation<EventStackParamList>();

    const userProfile = useGetCurrentProfileQuery();
    const userParticipation = event.participations.find(p => p.user_id === userProfile.data?.id)?.participation;

    const handlePress = () => {
        navigation.navigate('EventScreen', event);
    }

    return (
        <TouchableOpacity
            onPress={handlePress}

        >
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.titlesContainer}>
                        {userParticipation !== undefined ? (
                            userParticipation === "present" ? (
                                <Feather name="check-circle" size={24} color="green" />
                            ) : (
                                userParticipation === "absent" ? (
                                    <Feather name="x-circle" size={24} color="red" />
                                ) : (
                                    <Feather name="minus-circle" size={24} color="blue" />
                                )
                            )) : (
                            <Feather name="circle" size={24} color="grey" />
                        )}
                        <Text>{event.title}</Text>
                    </View>
                    <CategoryBadge category={event.category} />
                </View>
                <View style={styles.bottomContainer}>
                    <Text>{event.address}</Text>
                    <Text>{new Date(event.date).toDateString()}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    titlesContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    bottomContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
});