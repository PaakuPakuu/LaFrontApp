import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { store, AppDispatch, RootState } from "./store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppNavigation = <T extends ParamListBase>() => useNavigation<StackNavigationProp<T>>();
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;