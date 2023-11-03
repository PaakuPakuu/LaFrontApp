import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { supabase } from "../supabaseConfig";
import { UserEvent, EventComment, Profile, TablesInsert } from '../models/customModels';

export const supabaseApi = createApi({
    reducerPath: 'supabaseApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: [
        'Event',
        'Comment',
        'Profile'
    ],
    endpoints: (builder) => ({
        fetchAllEvents: builder.query<UserEvent[], void>({
            queryFn: async () => {
                const { data: Events } = await supabase
                    .from('Event')
                    .select("*, participations:Participation(*), comments:Comment(*)")
                    .order('date', { ascending: true });

                return { data: Events as UserEvent[] };
            },
            providesTags: ["Event"]
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
                    .select('*, profile:Profile(*)')
                    .eq('event', eventId);

                return { data: Comments as EventComment[] };
            },
            providesTags: ['Comment'],
        }),
        getCurrentProfile: builder.query<Profile, void>({
            async queryFn() {
                const { data: { user } } = await supabase.auth.getUser()

                const { data: Profile } = await supabase
                    .from('Profile')
                    .select()
                    .eq('user', user!.id)
                    .single();

                return { data: Profile as Profile };

            },
            providesTags: ['Profile']
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
        createEvent: builder.mutation<TablesInsert<"Event">, TablesInsert<"Event">>({
            async queryFn(eventToInsert) {
                const { data, error } = await supabase
                    .from('Event')
                    .insert(eventToInsert)
                    .select()
                    .single()

                console.log(eventToInsert, error)

                return { data: data as TablesInsert<"Event"> };
            }
        }),
        addComment: builder.mutation<EventComment, TablesInsert<"Comment">>({
            async queryFn(commentToInsert) {
                const { data, error } = await supabase
                    .from('Comment')
                    .insert([commentToInsert])
                    .select()
                    .single();

                return { data: data as EventComment };
            },
            invalidatesTags: ['Comment', 'Event']
        }),
        upsertProfile: builder.mutation<Profile, TablesInsert<"Profile">>({
            async queryFn(profileToCreate) {
                const { data, error } = await supabase
                    .from('Profile')
                    .upsert(profileToCreate)
                    .select()
                    .single();

                return { data: data as Profile };
            },
            invalidatesTags: ['Profile']
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
    useAddCommentMutation,
    useUpsertProfileMutation
} = supabaseApi