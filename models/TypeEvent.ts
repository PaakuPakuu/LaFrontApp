import {Participation} from "./Participation";
import {CommentType} from "./CommentType";
import {EnumEventCategory} from "../enums/EnumEventCategory";

export type TypeEvent = {
    id: string,
    title: string,
    date: string,
    participations: Participation[],
    commentaries: CommentType[],
    description: string,
    address: string,
    category: EnumEventCategory,
    picture : string,
}