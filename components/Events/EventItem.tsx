import { View, Text, TouchableOpacity } from "react-native";
import { TypeEvent } from "../../models/TypeEvent";
import { Feather } from '@expo/vector-icons';
import { EnumParticipation } from "../../enums/EnumParticipation";

interface Props {
    event: TypeEvent;
}

interface ParticipationProps {
    name: string;
    color: string;
}

export const EventItem = ({ event }: Props) => {
    // TODO : récupérer l'utilisateur
    const userParticipation = event.participations.find(p => p.user.id === 'rgre')?.participation;

    return (
        <TouchableOpacity>
            {userParticipation !== undefined ? (
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
            <Text>{event.title}</Text>
        </TouchableOpacity>
    );
};