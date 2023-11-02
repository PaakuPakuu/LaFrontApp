import {Text} from "react-native";

type Props = {
    instrument: string
}

export function Instrument({instrument}: Props) {
    return (<>
        <Text>{instrument}</Text>
    </>)
}