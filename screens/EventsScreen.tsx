import {FlatList} from "react-native";
import {EventCard} from "../components/Events/EventCard";
import {Event} from "../models/Event";
import {EnumEventCategory} from "../enums/EnumEventCategory";

export function EventsScreen() {
    return (
        <>
        <FlatList
            data={DATA}
            numColumns={1}
            renderItem={({item}) =>
                <EventCard {...item} />
            }
            keyExtractor={item => item.id.toString()}
        >

        </FlatList>

        </>
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

const DATA:Event[] = [
    {
        id: 'efpkrjgr',
        title: 'Fête des allumoirs',
        date: new Date(),
        address:'2 rue de mon cul',
        picture: 'https://media.licdn.com/dms/image/D4E03AQGxDjtqke4RGg/profile-displayphoto-shrink_800_800/0/1680603599794?e=2147483647&v=beta&t=vj_eqeROueI-L8pU3LQCUTTFYmJE5bujQpTldaPubec',
        participations: [{
            id: 'lko',
            user: PAUL,
            participation: 0
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
]