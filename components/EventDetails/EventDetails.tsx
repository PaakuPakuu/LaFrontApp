import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { UserEvent } from "../../models/customModels";
import { EventDetailsComments } from "./EventDetailsComments";

type Props = {
  event: UserEvent;
};

export function EventDetails({ event }: Props) {
  return (
    <View>
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
  eventDetailsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  eventDetailsText: {
    fontSize: 16,
    textAlign: "center",
  },
});
