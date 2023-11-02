import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import { TypeEvent } from "../models/TypeEvent";
import { EnumEventCategory } from "../enums/EnumEventCategory";
import { ScreenHeader } from "../components/screenHeader/ScreenHeader";
import { EventCard } from "../components/Events/EventCard";
import { EventItem } from "../components/Events/EventItem";
import { EnumParticipation } from "../enums/EnumParticipation";

export function EventsScreen() {
    return (
        <SafeAreaView>
            <ScreenHeader title="Évènements" />
            <EventCard event={DATA[0]} />
            <FlatList
                data={DATA}
                renderItem={({ item }) => <EventItem event={item} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

const PAUL = {
    id: 'rgre',
    name: 'Paul',
    emailAddress: 'lol',
    nickname: 'popol',
    avatar: 'lolilol',
    password: '1243456'
}

const DATA: TypeEvent[] = [
    {
        id: 'efpkrjgr',
        title: 'Fête des allumoirs',
        date: new Date(),
        address: '2 rue de mon cul',
        picture: 'https://media.licdn.com/dms/image/D4E03AQGxDjtqke4RGg/profile-displayphoto-shrink_800_800/0/1680603599794?e=2147483647&v=beta&t=vj_eqeROueI-L8pU3LQCUTTFYmJE5bujQpTldaPubec',
        participations: [{
            id: 'lko',
            user: PAUL,
            participation: EnumParticipation.Present
        }],
        category: EnumEventCategory.Contract,
        description: 'Vené c kool',
        commentaries: [
            {
                id: 'fez',
                user: PAUL,
                text: "J'ai mis participe mais je m'en pas les couilles"
            }
        ]
    }
];

const styles = StyleSheet.create({

});