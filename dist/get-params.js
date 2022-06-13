import { isParam, toParamName } from "./utils.js";
export const getParams = (routePath, requestedPath) => {
    const { parts } = routePath;
    return parts
        .filter(isParam)
        .map(toParamName)
        .reduce((params, paramName, index) => {
        params[paramName] = requestedPath.parts[index];
        return params;
    }, {});
};
