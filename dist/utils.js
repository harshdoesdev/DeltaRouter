import { splitPath } from "./match-route.js";
export const parseSearchStr = str => {
    const searchParams = new URLSearchParams(str);
    const entries = searchParams.entries();
    const result = Object.fromEntries(entries);
    return result;
};
export const dispatchRouteEvent = (pathname, search) => {
    dispatchEvent(new CustomEvent('route', {
        cancelable: true,
        detail: {
            path: {
                pathname,
                parts: splitPath(pathname)
            },
            search
        }
    }));
};
