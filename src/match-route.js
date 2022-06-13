const isParam = v => v[0] === ':';

export const splitPath = path => path.split('/').filter(x => x);

export const getParams = (route, requestedPath) => {
    const { parts } = route;
    
    return parts.reduce((params, curr, index) => {
        if(isParam(curr)) {
            const name = curr.slice(1);
            params[name] = requestedPath.parts[index];
        }

        return params;
    }, {});
};

export const matchRoute = (routePath, requestedPath) => {
    const { pathname, parts  } = routePath;

    if(pathname === requestedPath.pathname || pathname === '*') {
        return pathname;
    }

    if(parts.length !== requestedPath.parts.length) {
        return;
    }

    const found = parts.every((curr, index) => 
        (curr === requestedPath.parts[index]) || isParam(curr));

    return found;
};