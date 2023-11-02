import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { supabase } from "../supabaseConfig";
import { Tables } from '../database.types';

export const supabaseApi = createApi({
    reducerPath: 'supabaseApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Event'],
    endpoints: (builder) => ({
        fetchAllEvents: builder.query<Tables<"Event">[], void>({
            queryFn: async () => {
                const { data: Events } = await supabase
                    .from('Event')
                    .select()

                return { data: Events as Tables<"Event">[] };
            },
        }),
        getOneEvent: builder.query<Tables<"Event">, number>({
            async queryFn(id) {

                const { data } = await supabase
                    .from('Event')
                    .select()
                    .eq('id', id)
                    .single();

                return { data: data as Tables<"Event"> };
            },
        }),
        fetchAllCommentariesPerEvent: builder.query<Tables<"Comment">[], string>({
            async queryFn(eventId) {

                let { data: Events } = await supabase
                    .from('Comment')
                    .select('text, created_at, author')
                    .eq('event', eventId)
                    .eq('event', eventId)


                return { data: Events as Tables<"Comment">[] };
            },
        }),
        getCurrentProfile: builder.query<Tables<"Profile">, void>({
            async queryFn() {
                const { data: { user } } = await supabase.auth.getUser()

                let { data: Profile } = await supabase
                    .from('Profile')
                    .select()
                    .eq('user', user!.id)
                    .single()

                return { data: Profile as Tables<"Profile"> }

            }
        }),
        getUserEvents: builder.query<Tables<"Event">[], void>({
            async queryFn() {
                const { data: { user } } = await supabase.auth.getUser()

                let { data: Events } = await supabase
                    .from('Event')
                    .select()
                    .eq('user', user!.id)

                return { data: Events as Tables<"Event">[] };
            }
        }),
        createEvent: builder.mutation<Tables<"Event">, Tables<"Event">>({
            async queryFn(eventToInsert) {
                const { data } = await supabase
                    .from('Event')
                    .insert(eventToInsert)
                    .select()
                    .single()


                return { data: data as Tables<"Event"> }
            }
        }),
        addComment: builder.mutation<Tables<"Comment">, Tables<"Comment">>({
            async queryFn(commentToInsert) {
                const { data } = await supabase
                    .from('Comment')
                    .insert(commentToInsert)
                    .select()
                    .single();

                return { data: data as Tables<"Comment"> }
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