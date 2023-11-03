import {StyleSheet, Text, View} from "react-native";
import {Tables} from "../../database.types";

type Props = {
    event: Tables<"Event">
}

export function ProfileEvent({event}: Props) {

    return (<View style={styles.container}>
        <Text>{event.title}</Text>
        <Text>{event.category}</Text>
        <Text>{event.address}</Text>
        <Text>{new Date(event.date).toDateString()}</Text>
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