import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";

export function EventTimeLeft() {
    return(
        <View style={styles.container}>
            <View style={styles.bloc}>
                <Text>3</Text>
                <Text>Jours</Text>
            </View>
            <View style={styles.bloc}>
                <Text>12</Text>
                <Text>heures</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:"row"
    },
    bloc: {
        backgroundColor : 'white',
        borderRadius: 5

    }
});