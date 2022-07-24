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
            window.location.href = "/login";
        }
        next();
    }
};
</script>
