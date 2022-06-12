![DeltaRouter.js](https://github.com/rare-earth/DeltaRouter/raw/main/banner.png)
# DeltaRouter
A Minimal Client-Side Router

## Install
```bash
npm i delta-router
```

## Usage
```javascript
import Router, { navigate } from "delta-router";

const router = new Router();

router.on('/', () => {
    console.log('Welcome Home!');
});

router.on('/user/:uid', (params, search) => {
    console.log(params, search)
});

router.on('/404', pathname => console.error(`"${pathname}" Not Found.`));

router.listen();

const routeLinks = document.querySelectorAll('[data-route-link]');

routeLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        navigate(e.target.getAttribute('href'));
    });
});
```
