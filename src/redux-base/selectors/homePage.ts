import { createSelector } from "reselect";
import { RootState } from 'index';

const getRoot = (state: RootState) => state.homePage;

export const homePageIsLoadingSelector = createSelector(getRoot, (state) => state.isLoading);
