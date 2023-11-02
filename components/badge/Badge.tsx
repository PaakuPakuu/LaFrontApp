import { View, Text, StyleSheet } from "react-native";

interface Props {
    title: string;
    color: string;
}

export const Badge = ({ title, color }: Props) => {
    return (
        <View style={{ ...styles.container, backgroundColor: color }}>
            <Text>{title}</Text>
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