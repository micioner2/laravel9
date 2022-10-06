<template>
    <div class="modal" tabindex="-1" role="dialog" id="modal-empresa">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header" style="margin:0; padding: 8px;">
                    <h5 class="modal-title">Agregar Empresa</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <div class="input-group mb-3">
                                    <input type="text" placeholder="RUC" class="form-control col-10 form-control-sm" maxlength="11" v-model="empresa.ruc" @input="consultarDocumento">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-default my-group-button btn-sm" type="submit">
                                            <i class="fa fa-search"></i>
                                            &nbsp; Sunat
                                        </button>
                                    </div>
                                </div>
                                <p v-if="v$.ruc.$error" class="span-alert-form text-red">{{traducir(v$.ruc.$errors[0].$validator,v$.ruc.$errors[0].$params.min)}}</p>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" placeholder="Nombre Legal" v-model="empresa.nombre_legal"/>
                                <span v-if="v$.nombre_legal.$error" class="text-red">{{traducir(v$.nombre_legal.$errors[0].$validator)}}</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" placeholder="Nombre Comercial (opcional)" v-model="empresa.nombre_comercial"/>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" placeholder="Dirección Fiscal" v-model="empresa.direccion_fiscal"/>
                                <span v-if="v$.direccion_fiscal.$error" class="text-red">{{traducir(v$.direccion_fiscal.$errors[0].$validator)}}</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" placeholder="Teléfono" v-model="empresa.telefono"/>
                            </div>
                        </div>
                        <div class="col-8">
                            <div class="form-group">
                                <label for="">Foto</label>
                                <input type="file" class="form-control form-control-sm">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-sm btn-emitir float-right" @click="agregarEmpresa">Agregar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import useValidate from '@vuelidate/core'
import {useEmpresa} from '../../../app/stores/empresa'
import myMinxin from '../../../app/mixin/traductor'
import { required, minLength } from '@vuelidate/validators'
import { computed } from '@vue/runtime-core';

export default {
    mixins: [myMinxin],
    setup(){

        const store = useEmpresa();
        const empresa = storeToRefs(store).empresa;
        const traducir = myMinxin.methods.traductorMessage;

        const rules = computed(()=>{
            return {
                ruc: {
                    required,
                    minLength: minLength(11)
                },
                nombre_legal: { required },
                direccion_fiscal:{ required },
            }
        });


        const v$ = useValidate(rules,empresa)



        async function consultarDocumento (e) {
            let cant = Number(e.target.value.length);
            let longitud = 11;

            // Validar que el texto ingresado sea solo numeros;
            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');

           if(cant >= longitud){
            // opcion_icono.value = true
                var ruta = 'https://apiperu.dev/api/ruc/'+empresa.value.ruc+'?api_token=53972ac26112c49a8c2f374ee59d72d1784601b90a573cfcc8e77032142868b4';
                const response = await fetch(ruta);
                const data = await response.json();
                setTimeout(()=>{
                    if(data.success){
                        console.log(data);
                        empresa.value = {...empresa.value,'nombre_legal':data.data.nombre_o_razon_social, 'ruc':empresa.value.ruc,'direccion_fiscal':data.data.direccion}
                        // opcion_icono.value = false
                    }else{
                        // opcion_icono.value = false
                        alert("No pudimos obtener datos del RUC " +empresa.value.ruc );
                        empresa.value = {...empresa.value,'nombre':'','direccion':''}
                    }
                }, 1000);

            }
        }


        function agregarEmpresa(){
             this.v$.$validate() // checks all inputs
            if (!this.v$.$error) {

            }
         }



        return {
            empresa,
            v$,
            traducir,
            consultarDocumento,
            agregarEmpresa,

        }
    }
}

</script>


<style>
.span-alert-form{
    margin-top: -15px !important;
}
</style>
