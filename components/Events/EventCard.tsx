import {Card} from "react-native-paper";
import {TypeEvent} from "../../models/TypeEvent";
import {ImageBackground, View, StyleSheet} from "react-native";
import {EventTypeBadge} from "./EventTypeBadge";
import { Text } from 'react-native-paper';
import {EventTimeLeft} from "./EventTimeLeft";

type Props = TypeEvent;

export function EventCard(event: Props) {
    const eventDate = new Date(event.date)

    return (
        <Card mode={"outlined"}>
            <ImageBackground  resizeMethod={"resize"} source={{uri: event.picture}} style={{flex: 1, justifyContent: 'center'}}>
            <View style={{  }}>
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
                    {event.commentaries.length} Commentaire(s)
                </Text>
            </View>

            <View>
                <Text>{eventDate.getDate()} {eventDate.getMonth()} {eventDate.getFullYear()},
                    à {eventDate.getHours()}:{eventDate.getMinutes()}</Text>

                <EventTimeLeft />
            </View>
            </ImageBackground>
        </Card>)
}

const styles = StyleSheet.create({

});