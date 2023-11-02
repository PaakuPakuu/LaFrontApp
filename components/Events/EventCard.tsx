import {EventType} from "../../models/EventType";
import {ImageBackground, View, StyleSheet, TouchableOpacity} from "react-native";
import {EventTypeBadge} from "./EventTypeBadge";
import {Text} from 'react-native-paper';
import {EventTimeLeft} from "./EventTimeLeft";
import {useNavigation} from "@react-navigation/native";


type Props = EventType;

export function EventCard(event: Props) {
    const eventDate = new Date(event.date)
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('EventScreen', event.id)}>
            <ImageBackground resizeMethod={"resize"} source={{uri: event.picture}}
                             style={{flex: 1, justifyContent: 'center'}}>
                <View style={{}}>
                    <View>
                        <Text variant="titleSmall">Votre prochain évènement : </Text>
                        <Text variant="titleLarge"> {event.title} </Text>
                    </View>

                    <View>
                        <EventTypeBadge eventCategory={event.category}/>
                    </View>
                </View>

                <View>
                    <Text>Logo</Text>
                    <Text>{event.address}</Text>
                </View>

                <View>
                    <Text>
                        {event?.commentaries?.length} Commentaire(s)
                    </Text>
                </View>

                <View>
                    <Text>{eventDate.getDate()} {eventDate.getMonth()} {eventDate.getFullYear()},
                        à {eventDate.getHours()}:{eventDate.getMinutes()}</Text>

                    <EventTimeLeft/>
                </View>
            </ImageBackground>
        </TouchableOpacity>)
}