<template>
    <h1>BIENVENIDO</h1>
</template>

<script>

export default {
    beforeRouteEnter(to, from, next) {
        if (!window.Laravel.isLoggedin) {
            window.location.href = "/login";
        }
        next();
    }
}
</script>