import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {CategoryBadge} from "../badge/CategoryBadge";
import {UserEvent} from "../../models/customModels";
import {useAppNavigation} from "../../hooks";
import {EventStackParamList} from "../../App";

interface Props {
    event: UserEvent;
}

export function EventCard({event}: Props) {
    const navigation = useAppNavigation<EventStackParamList>();

    const eventDate = new Date(event.created_at).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const eventHour = new Date(event.created_at).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute:"2-digit"
    });

    const handlePress = () => {
        navigation.navigate('EventScreen', event);
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
        >
            <View style={styles.headerContainer}>
                <View style={styles.titlesContainer}>
                    <Text style={styles.subTitle}>Votre prochain évènement</Text>
                    <Text style={styles.title}>{event?.title}</Text>
                </View>
                <CategoryBadge category={event?.category}/>
            </View>
            <View style={styles.bottomContainer}>
                <Text>{event.comments.length} commentaire(s)</Text>
                <View>
                    <Text style={{textAlign: "right"}}>{eventHour}</Text>

                    <Text>{eventDate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        minHeight: 150,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titlesContainer: {
        flex: 1,
    },
    subTitle: {
        fontSize: 10,
        color: '#999',
    },
    title: {
        fontSize: 20,
    },
    bottomContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems:'flex-end'
    }
});