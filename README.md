![DeltaRouter.js](https://github.com/rare-earth/DeltaRouter/raw/main/banner.png)
# DeltaRouter
A Minimal Client-Side Router

## Installation
```bash
npm i delta-router
```

## Usage
```javascript
import Router, { navigate } from "delta-router";

const router = new Router();

router.on('/', () => console.log('Welcome Home!'));

router.on('/user/:uid', (params, search) => console.log(params, search));

router.on('/user/:uid/post/:postId', (params) => console.log(params));

router.on('*', (params, search, pathname) => console.error(`"${pathname}" not found.`));

router.listen();

const routeLinks = document.querySelectorAll('[data-route-link]');

routeLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const path = e.target.getAttribute('href');
        navigate(path, router.currentPath === path);
    });
});
```
