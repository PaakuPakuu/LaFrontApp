import {User} from "./User";
import {EnumParticipation} from "../enums/EnumParticipation";

export type CommentType = {
    id: string,
    user: User,
    text: string,
    author: string,
    created_at: string
}