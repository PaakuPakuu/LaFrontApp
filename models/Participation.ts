import { User } from "./User";
import { EnumParticipation } from "../enums/EnumParticipation";

export type Participation = {
    id: string,
    user: User,
    participation: EnumParticipation,
}