import { useRoute } from "@react-navigation/native";
import { EventDetailsComments } from "../components/EventDetails/EventDetailsComments";
import { UserEvent } from "../models/customModels";
import { EventDetails } from "../components/EventDetails/EventDetails";

export function EventScreen() {
    const route = useRoute()
    const  event = route.params as UserEvent

    return (
        <>
            <EventDetails event={event}/>
        </>
    )
}