<template>
    <div class="card card-default">
        <div class="card-header">
            <div class="row">
                <div class="col-12">
                    <button class="btn btn-primary btn-sm" @click="abrirModalEmpresa"><i class="fa fa-plus"></i>&nbsp;&nbsp;Agregar una Empresa</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <table class="table table-striped table-bordered dt-responsive table-sm" id="table_empresa">
                        <thead>
                            <tr>
                                <th>RUC</th>
                                <th>Razón Social</th>
                                <th>Nombre Legal</th>
                                <th>Nombre Comercial</th>
                                <th>Dirección Fiscal</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in empresas" :key="index">
                                <td>{{item.ruc}} </td>
                                <td>{{item.razon_social}}</td>
                                <td>{{item.nombre_legal}}</td>
                                <td>{{item.nombre_comercial}}</td>
                                <td>{{item.direccion_fiscal}}</td>
                                <td>{{item.Telefono}}</td>
                                <td>
                                    <button class="btn btn-primary btn-xs" @click="edit(item)"><i class="fa fa-edit"></i></button>
                                    &nbsp;
                                    <button class="btn btn-danger btn-xs" ><i class="fa fa-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <modal-empresa />
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import ModalEmpresa from './ModalEmpresa';

    export default {
        components:{
            'modal-empresa': ModalEmpresa
        },
        setup(){

            const empresas = ref([
                {
                    ruc: '123456789',
                    razon_social: 'Empresa 1',
                    nombre_legal: 'Nombre Legal 1',
                    nombre_comercial: 'Nombre Comercial 1',
                    direccion_fiscal: 'Direccion Fiscal 1',
                    Telefono: 'Telefono 1'
                }
            ]);

            const abrirModalEmpresa = () => {
                $('#modal-empresa').modal('show');
            }

            onMounted(() => {
                $(()=>{
                    $('#table_empresa').dataTable({
                         "language": {
                            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
                        },
                        "pageLength": 10,
                        "searching": true,
                        "processing": true,
                        // "columns": size_colum,
                        destroy : true,
                        searching: true,
                    })
                })
            });
            return{
                empresas,
                abrirModalEmpresa
            }
        }
    }
</script>