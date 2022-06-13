export const isParam = v => v[0] === ':';

export const toParamName = v => v.slice(1);

export const splitPath = path => path.split('/').filter(x => x);

const parseSearchStr = str => {
    const searchParams = new URLSearchParams(str);
    const entries = searchParams.entries();
    const result = Object.fromEntries(entries);

    return result;
};

export const dispatchRouteEvent = (pathname, searchString) => {
    const parts = splitPath(pathname);
    const search = parseSearchStr(searchString);

    dispatchEvent(new CustomEvent('route', {
        cancelable: true,
        detail: {
            path: {
                pathname,
                parts
            },
            search
        } 
    }));
};