const routes = [
  // 1) Redireciona raiz para login
  {
    path: '/',
    redirect: '/login',
  },

  // 2) Rota de login SEM o MainLayout
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginApp.vue'),
  },

  // 3) Layout principal para telas autenticadas
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('pages/HomeApp.vue'),
      },
      {
        path: 'produtos',
        name: 'produtos',
        component: () => import('pages/ProdutosApp.vue'),
      },
      {
        path: 'product-entry',
        name: 'product-entry',
        component: () => import('pages/ProductEntry.vue'),
      },
      // adicione outras rotas protegidas aqui...
    ],
  },

  // 4) fallback para 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
