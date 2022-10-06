<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script>
import AppLayout from "./layouts/AppLayout.vue";
export default {
  components: {
    "app-layout": AppLayout
  },
    beforeRouteEnter(to, from, next) {
        if (!window.Laravel.isLoggedin) {
            // window.location.href = "laravel9/public/login/";
            // return { name: 'login' }
             next({ path: '/login' });
        }
        next();
    }
};
</script>
