<template>
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="index3.html" class="brand-link">
            <img :src="asset('images/AdminLTELogo.png')" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
                style="opacity: .8">
            <span class="brand-text font-weight-light">AdminLTE 3</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <img :src="asset('images/avatar5.png')" class="img-circle elevation-2" alt="User Image">
                </div>
                <div class="info">
                    <a href="#" class="d-block">MAURICIO ZAPATA</a>
                </div>
            </div>

            <!-- SidebarSearch Form -->


            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                    data-accordion="false">
                    <!-- Add icons to the links using the .nav-icon class
                 with font-awesome or any other icon font library -->


                    <li class="nav-item menu-open">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fa fa-university"></i>
                            <p>
                                Registros
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <router-link class="nav-link" :to="{name:'empresa'}">
                                   <p>Empresa</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>


                    <li class="nav-item">
                    <!-- <li class="nav-item menu-open"> -->
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-edit"></i>
                            <p>
                                Documentos
                                <i class="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <router-link class="nav-link" :to="{name:'comprobante'}">
                                   <p>Comprobantes</p>
                                </router-link>
                            </li>
                             <li class="nav-item">
                                <router-link class="nav-link" :to="{name:'emisionboleta'}">
                                   <p>Emitir</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->

    </aside>
</template>

<script>
    import myMinxin from '../../app/mixin/asset'
    export default {
        setup() {
            const asset = myMinxin.methods.asset;
            return {asset}
        }
    }
</script>
