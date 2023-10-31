import {Participation} from "./Participation";
import {Commentary} from "./Commentary";
import {EnumEventCategory} from "../enums/EnumEventCategory";

export type TypeEvent = {
    id: string,
    title: string,
    date: string,
    participations: Participation[],
    commentaries: Commentary[],
    description: string,
    address: string,
    category: EnumEventCategory,
    picture : string,
}