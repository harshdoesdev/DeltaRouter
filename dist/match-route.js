import { isParam } from "./utils.js";
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
