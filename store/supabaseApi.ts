import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react'

import {TypeEvent} from "../models/TypeEvent"
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
        fetchAllEvents: builder.query<Array<TypeEvent>, void>({
            async queryFn() {

                let {data: Events} = await supabase
                    .from('Event')
                    .select()

                return {data: Events}
            },
        }),
        getOneEvent: builder.query<TypeEvent, number>({
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
                    .eq('event',eventId)


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
        getUserEvents: builder.query <TypeEvent[], void>({
            async queryFn() {
                const {data: {user}} = await supabase.auth.getUser()

                let {data: Events} = await supabase
                    .from('Event')
                    .select()
                    .eq('creator', user.id)

                return {data: Events}
            }

        }),
    })
})

export const {
    useFetchAllEventsQuery,
    useGetCurrentProfileQuery,
    useGetUserEventsQuery,
    useGetOneEventQuery,
    useFetchAllCommentariesPerEventQuery
} = supabaseApi