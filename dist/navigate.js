export default function navigate(path, replace = false) {
    const [pathname, searchString = ''] = path.split('?');
    history[replace ? 'replaceState' : 'pushState']({}, '', path);
    dispatchRouteEvent(pathname, searchString);
}
