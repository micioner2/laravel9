
import {createWebHistory, createRouter} from "vue-router";


import Login from "./app/auth/Login.vue";
import AuthLayout from "./app/auth/Index.vue";
import Dashboard from "./app/Index.vue";
import Prueba from "./components/Prueba.vue";


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
      path: '',
      component: () => Dashboard,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => Dashboard,
          name: 'dashboard',
          meta: {
            requiresAuth: true,
            requiresVisitor: false,
            title: 'Dashboard'
          },
        },
      ]
    },

    {
      path:'/prueba',
      components: {
        default: Prueba,
        inner: Prueba
      }
    }
];



const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'active'
});

router.beforeEach((to, from) => {
  const isAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isHide = to.matched.some((record) => record.meta.hideForAuth);


    if(isHide && !window.Laravel.isLoggedin){
      return { name: 'login' }
    }
  
})

export default router;