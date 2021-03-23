import { createSelector } from "reselect";
import { RootState } from 'AppRootComponent';

const getRoot = (state: RootState) => state.homePageReducer;

export const homePageIsLoadingSelector = createSelector(getRoot, (state) => state.isLoading);
