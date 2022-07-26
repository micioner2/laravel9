<template>
<li class="nav-item dropdown user user-menu">
    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
        <img src="images/user2-160x160.jpg" class="user-image img-circle elevation-2">
        <span class="hidden-xs">{{name}}</span>
    </a>
    <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <!-- User image -->
        <!-- <li class="user-header bg-primary">
            <img src="../assets/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">

            <p>
                Alexander Pierce - Web Developer
                <small>Member since Nov. 2012</small>
            </p>
        </li> -->
        <!-- Menu Body -->
        <li class="user-body">
            <div class="row">
                <div class="col-4 text-center">
                    <button type="button" class="btn btn-default" @click="logout"><i class="fa fa-power-off"></i></button>
                </div>
            </div>
        </li>
        <!-- Menu Footer-->
        <!-- <li class="user-footer">
            <div class="pull-left">
                <a href="#" class="btn btn-default btn-flat">Profile</a>
            </div>
            <div class="pull-right">
                <a href="#" class="btn btn-default btn-flat">Sign out</a>
            </div>
        </li> -->
    </ul>
</li>
</template>

<script>
export default {

    data(){
        return{
            name:null
        }
    },

    created() {
        if (window.Laravel.user) {
            this.name = window.Laravel.user.name
        }
    },
    methods:{
        logout(e) {
            e.preventDefault()
            this.$axios.get('/sanctum/csrf-cookie').then(response => {
                this.$axios.post('/api/logout')
                .then(response => {
                    if(response.data.success) {
                        // window.location.href = "/login"
                        // this.$router.push({name: 'login'});
                         this.$router.go('/login');
                    } else {
                        console.log(response);
                    }
                })
                .catch(function (error) {
                    console.error(error);
                });
            })
        }
    }
}

</script>