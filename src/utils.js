export const parseSearchStr = str => {
    const searchParams = new URLSearchParams(str);
    const entries = searchParams.entries();
    const result = Object.fromEntries(entries);

    return result;
};

export const dispatchRouteEvent = (path, search) => {
    dispatchEvent(new CustomEvent('route', {
        cancelable: true,
        detail: {
            path,
            search
        } 
    }));
};