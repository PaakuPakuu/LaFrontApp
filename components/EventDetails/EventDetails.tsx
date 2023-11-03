import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { UserEvent } from "../../models/customModels";
import { EventDetailsComments } from "./EventDetailsComments";

type Props = {
    event: UserEvent;
};

export function EventDetails({ event }: Props) {
    return (
        <View style={styles.eventDetailsContainer}>
            <Text style={styles.eventDetailsTitle}>Détails de l'événement</Text>
            <Text style={styles.eventDetailsText}>Titre : {event.title}</Text>
            <Text style={styles.eventDetailsText}>Description : {event.description}</Text>
            <Text style={styles.eventDetailsText}>Date : {event.date}</Text>
            <Text style={styles.eventDetailsText}>Catégorie : {event.category}</Text>
            <EventDetailsComments event={event} />
        </View>
    );
}

const styles = StyleSheet.create({

    eventDetailsContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        margin: 10,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },

    eventDetailsTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
    },
    eventDetailsText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
    },
});
