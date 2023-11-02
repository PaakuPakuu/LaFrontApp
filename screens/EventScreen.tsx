import {useRoute} from "@react-navigation/native";
import {useGetOneEventQuery} from "../store/supabaseApi";
import {EventComments} from "../components/Event/EventComments";

export function EventScreen() {
    const route = useRoute()
    const id: number = route.params as unknown as number;

    return(
        <>
            <EventComments eventId={id} />
        </>
    )
}