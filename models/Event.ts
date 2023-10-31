import {Participation} from "./Participation";
import {Commentary} from "./Commentary";
import {EnumEventCategory} from "../enums/EnumEventCategory";

export type Event = {
    id: string,
    title: string,
    date: Date,
    participations: Participation[],
    commentaries: Commentary[],
    description: string,
    address: string,
    category: EnumEventCategory,
    picture : string,
}