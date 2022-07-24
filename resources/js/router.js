
import { createWebHistory, createRouter } from "vue-router";


import Login from "./app/auth/Login.vue";
import AuthLayout from "./app/auth/Index.vue";
import NotFound from './app/pages/NotFound.vue'
import Main from "./app/Index.vue";
import Dashboard from "./components/Dashboard.vue";
import Prueba1 from "./components/Prueba.vue";
import Prueba2 from "./components/Prueba2.vue";


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
        path: '/prueba1',
        name: 'prueba1',
        component: () => Prueba1,
        meta:{
          title:'Página de prueba 1'
        }
      },

      {
        path: '/prueba2',
        name: 'prueba2',
        component: () => Prueba2,
        meta:{
          title:'Página de prueba 2'
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

  if (isHide && !window.Laravel.isLoggedin) {
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