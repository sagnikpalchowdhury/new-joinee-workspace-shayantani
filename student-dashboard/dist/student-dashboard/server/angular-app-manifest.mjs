
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/create-student"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 441, hash: 'f2e3740be5db40ec17ddc3e9e920d069a83fc9d2eac7853ce835965b69e0380d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 954, hash: '12c276872c0cebdfe20ba6fdff2c97428722cdb98f99d9632e23667c518a3c1f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'create-student/index.html': {size: 7721, hash: '6e40c9a3af821e2eea17b765e3ff7d0605fc74e6fd54a431bd6f872c5a63da42', text: () => import('./assets-chunks/create-student_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 4496, hash: '0fec5f9cb4fb9258001809d9b42b113706902e819a72dbe6354d62414c39ebe4', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
