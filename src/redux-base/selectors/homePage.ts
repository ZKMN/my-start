import { createSelector } from "reselect";
import { RootState } from 'AppRootComponent';

const getRoot = (state: RootState) => state.homePage;

export const homePageIsLoadingSelector = createSelector(getRoot, (state) => state.isLoading);
