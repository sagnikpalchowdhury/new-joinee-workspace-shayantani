
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
    'index.csr.html': {size: 441, hash: '21821cc081847a385ef0f703bfe41fe0971dc0a32a48c49bf0dc802334ce20ef', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 954, hash: '7fd10e48cc1d5ced03a09bf246b3de2434e18065c02fbd818caed2f6ffad0dad', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 4496, hash: 'eab63bc6623db593a3f92a17599c3f70638ff1408a1c53a1c83a85300dc35fb8', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'create-student/index.html': {size: 6983, hash: 'c7bba2051c88447c6a3a8ff2b17b2f75ce5b9672d6dbea9c49852d9cad2709a1', text: () => import('./assets-chunks/create-student_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
