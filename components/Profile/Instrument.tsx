import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
    instrument: string
}

export function Instrument({ instrument }: Props) {
    return (
        <View style={styles.container}>
            <Feather name="music" size={24} color="black" />
            <Text style={styles.text}>{instrument}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#fff",
        borderRadius: 24,
        height: 48,
        marginBottom: 8,
    },
    text: {
        fontSize: 16
    }
});