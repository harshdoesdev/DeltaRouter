export function navigate(path: any, replace?: boolean): void;
export default class Router {
    currentPath: any;
    boundHandleRoute: any;
    boundHandlePopState: any;
    handleRoute(e: any): void;
    handlePopState(): void;
    on(pathname: any, handler: any): void;
    listen(): void;
    unlisten(): void;
    attachListeners(): void;
    detachListeners(): void;
    #private;
}
//# sourceMappingURL=router.d.ts.map