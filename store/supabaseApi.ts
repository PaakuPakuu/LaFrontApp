import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react'

import {EventType} from "../models/EventType"
import {supabase} from "../supabaseConfig";
import {ProfileType} from "../models/ProfileType";
import {CommentType} from "../models/CommentType";


type Props = {
    data: ProfileType
}

export const supabaseApi = createApi({
    reducerPath: 'supabaseApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Event'],
    endpoints: (builder) => ({
        fetchAllEvents: builder.query<Array<EventType>, void>({
            async queryFn() {

                let {data: Events} = await supabase
                    .from('Event')
                    .select()

                return {data: Events}
            },
        }),
        getOneEvent: builder.query<EventType, number>({
            async queryFn(id) {

                let {data: Event} = await supabase
                    .from('Event')
                    .select()
                    .eq('id', id)

                return {data: Event}
            },
        }),
        fetchAllCommentariesPerEvent: builder.query<CommentType[], string>({
            async queryFn(eventId) {

                let {data: Comments} = await supabase
                    .from('Comment')
                    .select('text, created_at, author')
                    .eq('event', eventId)


                return {data: Comments}
            },
        }),
        getCurrentProfile: builder.query <ProfileType, void>({
            async queryFn() {
                const {data: {user}} = await supabase.auth.getUser()

                if (user?.id) {

                    let {data: Profile} = await supabase
                        .from('Profile')
                        .select()
                        .eq('user', user.id)

                    return {data: Profile[0]}
                }
            }
        }),
        getUserEvents: builder.query <EventType[], void>({
            async queryFn() {
                const {data: {user}} = await supabase.auth.getUser()

                let {data: Events} = await supabase
                    .from('Event')
                    .select()
                    .eq('creator', user.id)

                return {data: Events}
            }
        }),
        createEvent: builder.mutation<void, EventType>({
            async queryFn(eventToInsert) {
                const {data, error} = await supabase
                    .from('Event')
                    .insert(eventToInsert)
                    .select()

                console.log(error)


                return {data: data, error: error}
            }
        }),
        addComment: builder.mutation<void, CommentType>({
            async queryFn(commentToInsert) {
                const {data, error} = await supabase
                    .from('Comment')
                    .insert(commentToInsert)
                    .select()

                console.log(error)

                return {data: data, error: error}
            }
        })
    })
})

export const {
    useFetchAllEventsQuery,
    useGetCurrentProfileQuery,
    useGetUserEventsQuery,
    useGetOneEventQuery,
    useFetchAllCommentariesPerEventQuery,
    useCreateEventMutation,
    useAddCommentMutation
} = supabaseApi