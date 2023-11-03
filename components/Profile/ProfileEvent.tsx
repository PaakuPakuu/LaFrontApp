import { StyleSheet, Text, View } from "react-native";
import { UserEvent } from "../../models/customModels";

type Props = {
    event: UserEvent
}

export function ProfileEvent({ event }: Props) {

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

    return (<View style={styles.container}>
        <Text>{event.title}</Text>
        <Text>{event.category}</Text>
        <Text>{event.address}</Text>
        <Text>{eventDate} - {eventHour}</Text>
    </View>)
}

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: 18,
        paddingTop: 20,
        paddingBottom: 12
    },
    container: {
        backgroundColor: '#e7e7e7',
        marginTop: 5,
        marginBottom: 5
    }

})