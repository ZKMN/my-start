import { RootStateOrAny } from "react-redux";
import { createSelector } from "reselect";

const getRoot = (state: RootStateOrAny) => state.homePageReducer;

export const homePageIsLoadingSelector = createSelector(getRoot, (state) => state.isLoading);
