import { View, StyleSheet, Text } from "react-native";
import { CategoryBadge } from "../badge/CategoryBadge";
import { Tables } from "../../database.types";

interface Props {
    event: Tables<"Event">;
}

export function EventCard({ event }: Props) {

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.titlesContainer}>
                    <Text style={styles.subTitle}>Votre prochain évènement</Text>
                    <Text style={styles.title}>{event?.title}</Text>
                </View>
                <CategoryBadge category={event?.category} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        minHeight: 200,
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
});