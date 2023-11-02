import { TypeEvent } from "../../models/TypeEvent";
import { View, StyleSheet, Text } from "react-native";
import { CategoryBadge } from "../badge/CategoryBadge";

interface Props {
    event: TypeEvent
}

export function EventCard({ event }: Props) {

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View>
                    <Text>Votre prochain évènement</Text>
                    <Text>{event.title}</Text>
                </View>
                <CategoryBadge category={event.category} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});