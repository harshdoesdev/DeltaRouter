export const parseSearchStr = (str: string) => {
    const searchParams = new URLSearchParams(str);
    const entries = searchParams.entries();
    const result = Object.fromEntries(entries);

    return result;
};

export const dispatchRouteEvent = (path: string, search: string) => {
    dispatchEvent(new CustomEvent('route', {
        cancelable: true,
        detail: {
            path,
            search
        } 
    }));
};