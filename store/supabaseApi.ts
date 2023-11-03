import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { supabase } from "../supabaseConfig";
import { UserEvent, EventComment, Profile } from '../models/customModels';

export const supabaseApi = createApi({
    reducerPath: 'supabaseApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Event'],
    endpoints: (builder) => ({
        fetchAllEvents: builder.query<UserEvent[], void>({
            queryFn: async () => {
                const { data: Events } = await supabase
                    .from('Event')
                    .select("*, participations:Participation(*), comments:Comment(*)")
                    .order('date', { ascending: true });

                return { data: Events as UserEvent[] };
            },
        }),
        getOneEvent: builder.query<UserEvent, number>({
            async queryFn(id) {
                const { data } = await supabase
                    .from('Event')
                    .select()
                    .eq('id', id)
                    .single();

                return { data: data as UserEvent };
            },
        }),
        fetchAllCommentariesPerEvent: builder.query<EventComment[], number>({
            async queryFn(eventId) {
                const { data: Comments } = await supabase
                    .from('Comment')
                    .select()
                    .eq('event', eventId);

                return { data: Comments as EventComment[] };
            },
        }),
        getCurrentProfile: builder.query<Profile, void>({
            async queryFn() {
                const { data: { user } } = await supabase.auth.getUser()

                const { data: Profile } = await supabase
                    .from('Profile')
                    .select()
                    .eq('user', user!.id)
                    .single();

                return { data: Profile as Profile }

            }
        }),
        getUserEvents: builder.query<UserEvent[], void>({
            async queryFn() {
                const { data: { user } } = await supabase.auth.getUser()

                let { data: Events } = await supabase
                    .from('Event')
                    .select()
                    .eq('user', user!.id);

                return { data: Events as UserEvent[] };
            }
        }),
        createEvent: builder.mutation<UserEvent, UserEvent>({
            async queryFn(eventToInsert) {
                const { data } = await supabase
                    .from('Event')
                    .insert(eventToInsert)
                    .select()
                    .single()


                return { data: data as UserEvent }
            }
        }),
        addComment: builder.mutation<EventComment, EventComment>({
            async queryFn(commentToInsert) {
                const { data } = await supabase
                    .from('Comment')
                    .insert(commentToInsert)
                    .select()
                    .single();

                return { data: data as EventComment }
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