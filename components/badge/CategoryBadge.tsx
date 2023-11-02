import { EnumEventCategory } from "../../enums/EnumEventCategory"
import { Badge } from "./Badge";

interface Props {
    category: EnumEventCategory;
}

export const CategoryBadge = ({ category }: Props) => {
    switch (category) {
        case EnumEventCategory.Contract:
            return (
                <Badge title="Contrat" color="#FFC107" />
            );
        case EnumEventCategory.Busk:
            return (
                <Badge title="Manche" color="#FF9800" />
            );
        case EnumEventCategory.Internal:
            return (
                <Badge title="Interne" color="#FF5722" />
            );
    }
}