const isParam = (v: string) => v[0] === ':';

const splitPath = (path: string) => path.split('/').filter(x => x.length);

export const getParams = (foundPath: string, path: string) => {
    const mParts = splitPath(foundPath);
    const parts = splitPath(path);

    return mParts.reduce((params, curr, index) => {
        if(isParam(curr)) {
            const name = curr.slice(1);
            params[name] = parts[index];
        }

        return params;
    }, {});
};

export const matchRoute = (routePath: string, path: string) => {
    if(path === routePath) {
        return routePath;
    }

    const rParts = splitPath(routePath);
    const parts = splitPath(path);

    if(rParts.length !== parts.length) {
        return;
    }

    const found = rParts.every((curr, index) => {
        if(curr === parts[index]) {
            return true;
        } else if(isParam(curr) && !!parts[index]) {
            return true;
        }

        return false;
    });

    return found;
};