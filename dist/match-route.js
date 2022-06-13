const isParam = v => v[0] === ':';
const toParamName = v => v.slice(1);
export const splitPath = path => path.split('/').filter(x => x);
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
export const matchRoute = (routePath, requestedPath) => {
    const { pathname, parts } = routePath;
    if (pathname === requestedPath.pathname || pathname === '*') {
        return pathname;
    }
    if (parts.length !== requestedPath.parts.length) {
        return;
    }
    const found = parts.every((curr, index) => (curr === requestedPath.parts[index]) || isParam(curr));
    return found;
};
