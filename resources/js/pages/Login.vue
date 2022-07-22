<template>
<div class="login-box">
    <div class="card card-outline card-primary">
        <div class="card-header text-center">
            <!-- <a href="../../index2.html" class="h1"><b>Admin</b>LTE</a> -->
        </div>
        <div class="card-body">
            <p class="login-box-msg">Sign in to start your session</p>
            <form>
                <div class="input-group mb-3">
                    <input id="email" type="email" class="form-control" v-model="email" required autofocus placeholder="Enter your email">
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-envelope"></span>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input id="password" type="password" class="form-control" v-model="password" required autocomplete="off" placeholder="Enter your password">
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8">
                        <div class="icheck-primary">
                            <input type="checkbox" id="remember">
                            <label for="remember">
                                Remember Me
                            </label>
                        </div>
                    </div>

                    <div class="col-4">
                        <button type="submit" class="btn btn-primary btn-block"  @click="handleSubmit">Sign In</button>
                    </div>

                </div>
            </form>

        </div>
        <div class="card-footer">
            <div v-if="error !== null" class="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>{{error}}</strong>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                email: "",
                password: "",
                error: null
            }
        },

        methods: {
            handleSubmit(e) {
                e.preventDefault()
                if(this.password.length > 0) {
                    this.$axios.get('/sanctum/csrf-cookie').then(response => {
                        this.$axios.post('api/login', {
                            email: this.email,
                            password: this.password
                        })
                        .then(response => {
                            if (response.data.success) {
                                // this.$router.go('/login')
                                this.$router.push({name: 'dashboard'});
                            } else {
                                this.error = response.data.message
                            }
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                    })
                }
            }
        },


        // beforeRouteEnter(to, from, next) {
            
        //     if (window.Laravel.isLoggedin) {
        //         return next('dashboard');
        //     }
        //     next();
        // }
    }
</script>