export default class Router {
    _routes: any[];
    _currentPath: any;
    bound_handleRoute: any;
    bound_handlePopState: any;
    _handleRoute(e: any): void;
    _handlePopState(): void;
    on(pathname: string, handler: routeHandler): void;
    listen(): void;
    unlisten(): void;
    attachListeners(): void;
    detachListeners(): void;
}
