/**
 * navigate - navigate using history api
 * @param {string} path pathname
 * @param {boolean} replace replace state
 */
export default function navigate(path, replace = false) {
    const [pathname, searchString = ''] = path.split('?');

    history[replace ? 'replaceState' : 'pushState']({}, '', path);
    dispatchRouteEvent(pathname, searchString);
}