import {Participation} from "./Participation";
import {CommentType} from "./CommentType";
import {EnumEventCategory} from "../enums/EnumEventCategory";

export type EventType = {
    address: string
    created_at: string
    creator: string
    date: string
    description: string | null
    id?: number
    picture: string
    title: string
}