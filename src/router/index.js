// src/router/index.js
import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // navigation guard: exige login antes de /app/* e permite sessionStorage ou localStorage
  Router.beforeEach((to, from, next) => {
    const isAuthenticated =
      localStorage.getItem('authenticated') === 'true' ||
      sessionStorage.getItem('authenticated') === 'true'

    // rota de login
    if (to.path === '/login') {
      // se já autenticado, redireciona à home, senão deixa acessar login
      return isAuthenticated ? next({ path: '/app/home' }) : next()
    }

    // rotas protegidas sob /app
    if (to.path.startsWith('/app') && !isAuthenticated) {
      return next({ path: '/login' })
    }

    // para todas as demais rotas (/, /:catchAll etc.), segue normalmente
    next()
  })

  return Router
})
