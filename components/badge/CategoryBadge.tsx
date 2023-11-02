import { Enums } from "../../database.types";
import { Badge } from "./Badge";

interface Props {
    category: Enums<"event_categories">
}

export const CategoryBadge = ({ category }: Props) => {
    switch (category) {
        case "contract":
            return (
                <Badge title="Contrat" color="#FFC107" />
            );
        case "busk":
            return (
                <Badge title="Manche" color="#FF9800" />
            );
        case "internal":
            return (
                <Badge title="Interne" color="#FF5722" />
            );
    }
}