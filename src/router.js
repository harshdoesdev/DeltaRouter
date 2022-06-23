import getParams from "./get-params.js";
import matchRoute from "./match-route.js";
import { dispatchRouteEvent, splitPath } from "./utils.js";

export default class Router {

    _routes = []
    _currentPath = null

    bound_handleRoute = this._handleRoute.bind(this)
    bound_handlePopState = this._handlePopState.bind(this)

    _handleRoute(e) {
        const { path, search } = e.detail;

        const found = this._routes
            .find(route => matchRoute(route.path, path));

        if(!found) {
            console.error('Not Found.');
            return;
        }

        const params = getParams(found.path, path);

        this._currentPath = path.pathname;

        found.handler(params, search, this._currentPath);
    }

    _handlePopState() {
        const { pathname, search } = window.location;

        dispatchRouteEvent(pathname, search);
    }

    /**
     * on - add route handler
     * @param {string} pathname route path
     * @param {routeHandler} handler route handler
     */
    on(pathname, handler) {
        this._routes.push({ 
            path: { 
                pathname, 
                parts: splitPath(pathname) 
            }, 
            handler 
        });
    }

    /**
     * listen - attach listeners to start listening for route events
     */
    listen() {
        // put wildcard routes in the end of the routes array
        this._routes.forEach((route, index) => {
            if(route.path.pathname !== '*') {
                return;
            }

            this._routes.splice(index, 1);
            this._routes.push(route);
        });

        this.attachListeners();

        dispatchEvent(new PopStateEvent('popstate', { state: 'router-ignore' }));
    }

    /**
     * unlisten - detach listeners for route events
     */
    unlisten() {
        this.detachListeners();
    }

    attachListeners() {
        addEventListener('route', this.bound_handleRoute);
        addEventListener('popstate', this.bound_handlePopState);
    }

    detachListeners() {
        removeEventListener('route', this.bound_handleRoute);
        removeEventListener('popstate', this.bound_handlePopState);
    }

}