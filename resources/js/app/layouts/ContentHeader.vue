<template>
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-4">
                    <h2 class="m-0 text-title-page">{{title}}</h2>
                </div>
                <!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item">
                            <router-link :to="{name:'dashboard'}">
                                Dahboard
                            </router-link>
                        </li>
                        <li class="breadcrumb-item active">Dashboard v1</li>
                    </ol>
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
</template>

<script>

import { mapState } from 'pinia';
import {useTitle} from '../stores/title';

export default {
	computed:{
		...mapState(useTitle, ['title']),
	},
}

</script>

<style>
.text-title-page{
    font-size: 22px;
    font-weight: normal !important;
}
</style>