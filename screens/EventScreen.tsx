import {useRoute} from "@react-navigation/native";
import {useGetOneEventQuery} from "../store/supabaseApi";
import {EventDetailsComments} from "../components/EventDetails/EventDetailsComments";

export function EventScreen() {
    const route = useRoute()
    const id: number = route.params as unknown as number;

    return(
        <>
            <EventDetailsComments eventId={id} />
        </>
    )
}