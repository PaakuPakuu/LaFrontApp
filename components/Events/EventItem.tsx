import { TouchableOpacity, Text } from "react-native";
import { useGetCurrentProfileQuery } from "../../store/supabaseApi";
import { Feather } from "@expo/vector-icons";
import { Tables } from "../../database.types";

interface Props {
    event: Tables<"Event">;
}

export const EventItem = ({ event }: Props) => {
    const userProfile = useGetCurrentProfileQuery();

    console.log("Profile : " + userProfile.data?.firstname);

    // const userParticipation = event.participations.find(p => p.user.id === userProfile.data?.id.toString())?.participation;
    // event

    return (
        <TouchableOpacity>
            {/* {userParticipation !== undefined ? (
                userParticipation === EnumParticipation.Present ? (
                    <Feather name="check-circle" size={24} color="green" />
                ) : (
                    userParticipation === EnumParticipation.Absent ? (
                        <Feather name="x-circle" size={24} color="red" />
                    ) : (
                        <Feather name="minus-circle" size={24} color="orange" />
                    )
                )) : (
                <Feather name="circle" size={24} color="orange" />
            )}
            <Text>{event.title}</Text> */}
        </TouchableOpacity>
    );
};