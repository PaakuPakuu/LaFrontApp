import {User} from "./User";
import {EnumParticipation} from "../enums/EnumParticipation";

export type CommentType = {
    author: string
    created_at: string
    event: number | null
    id?: number
    text: string | null
}