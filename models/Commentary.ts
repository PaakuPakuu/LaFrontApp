import {User} from "./User";
import {EnumParticipation} from "../enums/EnumParticipation";

export type Commentary = {
    id: string,
    user: User,
    text: string,
}