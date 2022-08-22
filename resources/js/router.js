
import { createWebHistory, createRouter } from "vue-router";


import Login from "./app/auth/Login.vue";
import AuthLayout from "./app/auth/Index.vue";
import NotFound from './app/pages/NotFound.vue'
import Main from "./app/Index.vue";
import Dashboard from "./components/Dashboard.vue";
import Comprobante from "./components/sunat/comprobante/Index.vue";
import Emision from "./components/sunat/Emision/Index.vue";
import Empresa from "./components/registros/Empresa/Index.vue";

let routes = [

  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        component: Login,
        name: 'login',
        meta: { hideForAuth: false }
      },
    ]
  },


  {
    path: '/dashboard',
    name:'dashboard',
    component: () => Main,
    meta: {
      requiresAuth: true,
      requiresVisitor: false,
      title: 'Dashboard'
    },
    children: [
      

      {
        path:'/:NotFound(.*)*',
        component: ()  => NotFound,
          meta:{
            title:'Error 404'
          }
      },

      {
        path:'/dashboard',
        component: () => Dashboard,
        meta:{
          title:'Dashboard'
        }
      },
    

      {
        path: '/comprobante',
        name: 'comprobante',
        component: () => Comprobante,
        meta:{
          title:'Comprobantes de Pago'
        }
      },

      {
        path: '/emision',
        name: 'emision',
        component: () => Emision,
        meta:{
          title:'Emitir'
        }
      },

      {
        path: '/empresa',
        name: 'empresa',
        component: () => Empresa,
        meta:{
          title:'Resgitro de Empresa'
        }
      }

    ]
  },


];



const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory('/configure-admin/'),
  routes: routes,
  linkActiveClass: 'active'
});

router.beforeEach((to, from) => {
  // const isAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isHide = to.matched.some((record) => record.meta.hideForAuth);

  if (isHide) {
    return { name: 'login' }
  }
})


// router.beforeEach((to, from) => {
//   if (to.meta.requiresAuth && !window.Laravel.isLoggedin) {
//       return {
//           name: 'login',
//       }
//   }
// })

export default router;