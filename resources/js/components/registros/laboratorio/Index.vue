<template>
    <div class="card card-default">
        <div class="card-header">
            <h3 class="card-title">Laboratorios</h3>&nbsp;&nbsp;

            <div class="card-tools">
                <!-- <button class="btn btn-primary btn-sm" @click="userStore.incrementar()"><i class="fa fa-plus"></i></button>&nbsp; -->
                <!-- <button class="btn btn-danger btn-sm"  @click="userStore.disminuir()"><i class="fa fa-minus"></i></button> -->
                <button class="btn btn-primary btn-sm" @click="abrirModal()"><i class="fa fa-plus"></i> Nuevo</button>
                <!-- <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                </button>
                <button type="button" class="btn btn-tool" data-card-widget="remove">
                    <i class="fas fa-times"></i>
                </button> -->
            </div>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
            <div class="row">
                <div class="col-md-12">
                    <table id="myTable" class="table table-striped table-bordered dt-responsive table-sm" style="width:100%">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Opción</th>
                                <th>Nombre</th>
                                <th>Edad</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in arrayPersona" :key="index">
                                <td>{{(index+1)}}</td>
                                <td class="text-center"><button class="btn btn-primary btn-xs" @click="abrirModal(item)"><i class="fa fa-edit"></i></button></td>
                                <td v-text="item.nombre"></td>
                                <td v-text="Number(item.edad).toFixed(0)"></td>
                            </tr>

                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>

        <div class="card-footer">
       
        </div>

        <Modal :data="infoData"/>
    </div>
</template>

<script>
    import Modal from './Modal.vue'
    import myMixin from '../../../myMixin.js'
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    // import {useUserStore} from '../../../stores/user'
    

    export default {
        mixins: [myMixin],
        components:{
            Modal
        },  


        setup(props){

            let arrayPersona = ref([]);
            let infoData = ref([]);
            // const userStore = useUserStore();

            const abrirModal = (data) => {
                infoData.value = [];
                if(data != null){
                    infoData.value = data;
                }else{
                    
                }
                $('#modal-example').modal('show');
            }

            const getData = () =>{
                let api_url = process.env.MIX_API_URL;
             
                axios.get('persona').then((res)=>{
                    // $('#myTable').DataTable().destroy();
                    arrayPersona.value = res.data.persona
                    arrayPersona.value.length >= 1 ? myMixin.methods.dataTable([5,5,90,10]): []
                })
            }


            onMounted(()=>{
                getData();
            })
            
            return{
                arrayPersona,
                infoData,
                // userStore,
                abrirModal
            }
        }
    }

   

   
</script>

<style>
/* #myTable tbody tr td{
    font-size: 12px;
    
} */
</style>

