import { getParams, matchRoute, splitPath } from "./match-route.js";
import { dispatchRouteEvent, parseSearchStr } from "./utils.js";

export const navigate = (path, replace = false) => {
    const [pathname, search = ''] = path.split('?');

    history[replace ? 'replaceState' : 'pushState']({}, '', path);
    dispatchRouteEvent(pathname, search);
};

export default class Router {

    #routes = []
    currentPath = null

    boundHandleRoute = this.handleRoute.bind(this)
    boundHandlePopState = this.handlePopState.bind(this)

    handleRoute(e) {
        const { path, search } = e.detail;

        const found = this.#routes
            .find(route => matchRoute(route.path, path));

        if(!found) {
            console.error('Not Found.');
            return;
        }

        const params = getParams(found.path, path);

        this.currentPath = path.pathname;

        found.handler(params, parseSearchStr(search), this.currentPath);
    }

    handlePopState() {
        const { pathname, search } = window.location;

        dispatchRouteEvent(pathname, search.slice(1));
    }

    on(pathname, handler) {
        this.#routes.push({ 
            path: { 
                pathname, 
                parts: splitPath(pathname) 
            }, 
            handler 
        });
    }

    listen() {
        this.attachListeners();
    }

    unlisten() {
        this.detachListeners();
    }

    attachListeners() {
        addEventListener('route', this.boundHandleRoute);
        addEventListener('popstate', this.boundHandlePopState);
        
        dispatchEvent(new PopStateEvent('popstate', { state: 'router-ignore' }));
    }

    detachListeners() {
        removeEventListener('route', this.boundHandleRoute);
        removeEventListener('popstate', this.boundHandlePopState);
    }

}