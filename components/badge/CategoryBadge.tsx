import { Enums } from "../../models/customModels";
import { Badge } from "./Badge";

interface Props {
    category: Enums<"event_categories">
}

export const CategoryBadge = ({ category }: Props) => {
    switch (category) {
        case "contract":
            return (
                <Badge title="Contrat" color="#F44336" whiteText />
            );
        case "busk":
            return (
                <Badge title="Manche" color="#4CAF50" whiteText />
            );
        case "internal":
            return (
                <Badge title="Interne" color="#2196F3" whiteText />
            );
    }
}