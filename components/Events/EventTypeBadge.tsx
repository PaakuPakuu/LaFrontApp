import {Badge} from "react-native-paper";
import {EnumEventCategory} from "../../enums/EnumEventCategory";
import {EnumStatus} from "../../enums/EnumStatus";

type Props = {
    eventCategory: EnumEventCategory
}

export function EventTypeBadge({eventCategory}: Props) {

    const EventTypeBadgeColors = {
        'Contrat': 'red',
        'Manche': 'blue',
        'Interne': 'purple',
    }

    return (
        <Badge style={{backgroundColor: EventTypeBadgeColors[eventCategory]}}>{eventCategory}</Badge>
    )
}