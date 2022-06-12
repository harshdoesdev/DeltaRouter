![DeltaRouter.js](https://github.com/rare-earth/DeltaRouter/raw/main/banner.png)
# DeltaRouter
A Minimal Client-Side Router

## Usage
```javascript
import Router, { navigate } from "https://cdn.jsdelivr.net/gh/rare-earth/DeltaRouter/dist/router.js";

const router = new Router();

router.on('/', () => {
    console.log('Welcome Home!');
});

router.on('/user/:uid', (params, search) => {
    console.log(params, search)
});

router.on('/404', () => console.error(`Page Not Found.`));

router.listen();

const routeLinks = document.querySelectorAll('[data-route-link]');

routeLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        navigate(e.target.getAttribute('href'));
    });
});
```
