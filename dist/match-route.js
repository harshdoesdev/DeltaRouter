import { isParam } from "./utils.js";
const matchOrCatchAll = (a, b) => a === b || a === '*';
export default function matchRoute(routePath, requestedPath) {
    const { pathname, parts } = routePath;
    if (matchOrCatchAll(pathname, requestedPath.pathname)) {
        return pathname;
    }
    if (parts.length !== requestedPath.parts.length) {
        return;
    }
    const found = parts.every((curr, index) => (curr === requestedPath.parts[index]) || isParam(curr));
    return found;
}
;
