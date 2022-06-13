import { isParam, toParamName } from "./utils.js";

export const getParams = (routePath, requestedPath) => {
    const { parts } = routePath;
    
    return parts.reduce((params, current, index) => {
        if(isParam(current)) {
            const paramName = toParamName(current);
            
            params[paramName] = requestedPath.parts[index];
        }

        return params;
    }, {});
};