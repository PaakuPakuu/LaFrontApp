import {createApi, EndpointDefinition, fakeBaseQuery} from '@reduxjs/toolkit/query/react'

import {
    collection,
    getDocs,
} from 'firebase/firestore';

import {TypeEvent} from "../models/TypeEvent"
import {firestore} from "../services/Firebase";


export const firestoreApi = createApi({
    reducerPath: 'firestoreApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Event'],
    endpoints: (builder) => ({
        fetchAllEvents: builder.query<Array<TypeEvent>, void>({
            async queryFn() {
                const ref = collection(firestore, 'event');
                const querySnapshot = await getDocs(ref);


                let events: TypeEvent[] = [];

                querySnapshot?.forEach((doc) => {
                    const eventData = doc.data();

                    const timeStamp = eventData.date.toDate().toDateString();

                    events.push(
                        {
                            id: doc.id,
                            date: timeStamp,
                            participations: eventData.participations,
                            category: eventData.category,
                            address: eventData.address,
                            commentaries: eventData.commentaries,
                            description: eventData.description,
                            picture: eventData.picture,
                            title: eventData.title
                        } as TypeEvent)
                })

                return {data: events}
            },
        }),
    })
})

export const {useFetchAllEventsQuery} = firestoreApi