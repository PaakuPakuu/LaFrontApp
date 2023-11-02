export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            Comment: {
                Row: {
                    author: string
                    created_at: string
                    event: number | null
                    id: number
                    text: string | null
                }
                Insert: {
                    author: string
                    created_at?: string
                    event?: number | null
                    id?: number
                    text?: string | null
                }
                Update: {
                    author?: string
                    created_at?: string
                    event?: number | null
                    id?: number
                    text?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "Comment_author_fkey"
                        columns: ["author"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "Comment_event_fkey"
                        columns: ["event"]
                        isOneToOne: false
                        referencedRelation: "Event"
                        referencedColumns: ["id"]
                    }
                ]
            }
            Event: {
                Row: {
                    address: string
                    category: Database["public"]["Enums"]["event_categories"]
                    created_at: string
                    date: string
                    description: string | null
                    id: number
                    picture: string
                    title: string
                    user: string
                }
                Insert: {
                    address: string
                    category: Database["public"]["Enums"]["event_categories"]
                    created_at?: string
                    date: string
                    description?: string | null
                    id?: number
                    picture: string
                    title: string
                    user: string
                }
                Update: {
                    address?: string
                    category?: Database["public"]["Enums"]["event_categories"]
                    created_at?: string
                    date?: string
                    description?: string | null
                    id?: number
                    picture?: string
                    title?: string
                    user?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "Event_user_fkey"
                        columns: ["user"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            Participation: {
                Row: {
                    created_at: string
                    event_id: number
                    id: number
                    participation: Database["public"]["Enums"]["participations"] | null
                    user_id: number
                }
                Insert: {
                    created_at?: string
                    event_id: number
                    id?: number
                    participation?: Database["public"]["Enums"]["participations"] | null
                    user_id: number
                }
                Update: {
                    created_at?: string
                    event_id?: number
                    id?: number
                    participation?: Database["public"]["Enums"]["participations"] | null
                    user_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "Participation_event_id_fkey"
                        columns: ["event_id"]
                        isOneToOne: false
                        referencedRelation: "Event"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "Participation_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "Profile"
                        referencedColumns: ["id"]
                    }
                ]
            }
            Profile: {
                Row: {
                    created_at: string
                    firstname: string | null
                    id: number
                    instruments: Database["public"]["Enums"]["instruments"][] | null
                    lastname: string | null
                    nickname: string | null
                    user: string | null
                }
                Insert: {
                    created_at?: string
                    firstname?: string | null
                    id?: number
                    instruments?: Database["public"]["Enums"]["instruments"][] | null
                    lastname?: string | null
                    nickname?: string | null
                    user?: string | null
                }
                Update: {
                    created_at?: string
                    firstname?: string | null
                    id?: number
                    instruments?: Database["public"]["Enums"]["instruments"][] | null
                    lastname?: string | null
                    nickname?: string | null
                    user?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "Profile_user_fkey"
                        columns: ["user"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            event_categories: "contract" | "busk" | "internal"
            instruments:
            | "sousaphone"
            | "saxophone"
            | "trombone"
            | "battery"
            | "trumpet"
            | "tuba"
            participations: "present" | "absent" | "maybe"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
