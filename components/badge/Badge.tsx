import { View, Text, StyleSheet } from "react-native";

interface Props {
    title: string;
    color: string;
    whiteText?: boolean;
}

export const Badge = ({ title, color, whiteText = false }: Props) => {
    return (
        <View style={{ ...styles.container, backgroundColor: color }}>
            <Text style={{ color: whiteText ? "#fff" : "#000" }}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
});