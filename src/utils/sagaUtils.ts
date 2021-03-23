import { stringifyUrl } from "query-string";
import { IRequestAction } from "utils";
// @ts-ignore
import path, { pathParams } from "path-params";

// noParams - value for parallel request if we don't need to add params to endpoint
export const addParamsToURL = (action: IRequestAction, noParams?: boolean) => {
  const { queryParams, routeParams, endpoint } = action;

  let urlWithRouteParams;

  // 2 imports and condition assignement for test, jest can't find pathParams
  // TODO: find solution to solve this problem
  if (pathParams) {
    urlWithRouteParams = pathParams(endpoint, routeParams);
  } else {
    urlWithRouteParams = path(endpoint, routeParams);
  }

  if (!noParams) {
    return stringifyUrl(
      { url: urlWithRouteParams, query: queryParams },
      { skipNull: true, skipEmptyString: true, arrayFormat: "comma" },
    );
  }

  return urlWithRouteParams;
};
