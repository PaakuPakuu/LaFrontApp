import {Card} from "react-native-paper";
import {Event} from "../../models/Event";
import {ImageBackground, View, StyleSheet} from "react-native";
import {EventTypeBadge} from "./EventTypeBadge";
import { Text } from 'react-native-paper';
import {EventTimeLeft} from "./EventTimeLeft";

type Props = Event;

export function EventCard(event: Props) {

    console.log(event.picture)

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
                <Text>{event.date.getDate()} {event.date.getMonth()} {event.date.getFullYear()},
                    à {event.date.getHours()}:{event.date.getMinutes()}</Text>

                <EventTimeLeft />
            </View>
            </ImageBackground>
        </Card>)
}

const styles = StyleSheet.create({

});