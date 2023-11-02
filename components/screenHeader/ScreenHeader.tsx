import { View, Text, StyleSheet } from "react-native";

interface Props {
    title: string;

}

export const ScreenHeader = ({ title }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    title: {
        fontSize: 24,
    }
});