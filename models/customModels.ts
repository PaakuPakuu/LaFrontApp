import { Database } from "./databaseModel";

type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

export type Profile = Tables<"Profile">;

export type UserEvent = Tables<"Event"> & {
    comments: EventComment[];
    participations: Participation[];
};

export type EventComment = Tables<"Comment">;

export type Participation = Tables<"Participation">;