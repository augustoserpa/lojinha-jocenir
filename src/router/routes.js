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
    component: () => import('src/pages/PaginaLogin.vue'),
  },

  // 3) Layout principal para telas autenticadas
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('src/pages/PaginaInicial.vue'),
      },
      {
        path: 'produtos',
        name: 'produtos',
        component: () => import('src/pages/PaginaListaProdutos.vue'),
      },
      {
        path: 'cadastro',
        name: 'cadastro',
        component: () => import('src/pages/CadastroNovosProdutos.vue'),
      },
      // adicione outras rotas protegidas aqui...
    ],
  },

  // 4) fallback para 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/PaginaErroPadrao.vue'),
  },
]

export default routes
