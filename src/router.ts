import { getParams, matchRoute } from "./match-route.js";
import { dispatchRouteEvent, parseSearchStr } from "./utils.js";

interface RouteHandler {
    (params: string[], search: any, router: Router)
}

interface RouteEvent {
    detail: {
        path: string,
        search: string
    }
}

export const navigate = (path: string) => {
    const [ pathname, search = '' ] = path.split('?');

    history.pushState({}, '', path);
    dispatchRouteEvent(pathname, search);
};

export default class Router {

    #routes = []
    currentRoute = null
    notFoundRoute = null

    boundHandleRoute = this.handleRoute.bind(this)
    boundHandlePopState = this.handlePopState.bind(this)

    handleRoute(e: RouteEvent) {
        const { path, search } = e.detail;

        const found = this.#routes
            .find(route => matchRoute(route.path, path));

        if(!found) {
            if(this.notFoundRoute) {
               this.notFoundRoute.handler(path, null, this); 
            }
            console.error('Not Found.');
            return;
        }

        if(found === this.currentRoute) {
            return;
        }

        const params = getParams(found.path, path);

        found.handler(params, parseSearchStr(search), this);

        this.currentRoute = found;
    }

    handlePopState() {
        const { pathname, search } = window.location;

        dispatchRouteEvent(pathname, search.slice(1));
    }

    listen() {
        this.notFoundRoute = this.#routes
            .find(route => route.path === '/404');
        
        this.attachListeners();
    }

    attachListeners() {
        addEventListener('route', this.boundHandleRoute);
        addEventListener('popstate', this.boundHandlePopState);
        
        dispatchEvent(new PopStateEvent('popstate', { state: 'router-ignore' }));
    }

    on(path: string, handler: RouteHandler) {
        this.#routes.push({ path, handler });
    }

    off(path: string) {
        this.#routes = this.#routes
            .filter(route => route.path !== path);
    }

}