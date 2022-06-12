import { getParams, matchRoute } from "./match-route.js";
import { dispatchRouteEvent, parseSearchStr } from "./utils.js";

export const navigate = path => {
    const [ pathname, search = '' ] = path.split('?');

    history.pushState({}, '', path);
    dispatchRouteEvent(pathname, search);
};

export default class Router {

    #routes = []
    currentRoute = null

    boundHandleRoute = this.handleRoute.bind(this)
    boundHandlePopState = this.handlePopState.bind(this)

    handleRoute(e) {
        const { path, search } = e.detail;

        const found = this.#routes
            .find(route => matchRoute(route.path, path));

        if(!found) {
            if(this.notFoundRoute) {
               this.notFoundRoute.handler(path); 
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

    on(path, handler) {
        this.#routes.push({ path, handler });
    }

    off(path) {
        this.#routes = this.#routes
            .filter(route => route.path !== path);
    }

}