<template>
    <div class="modal" tabindex="-1" role="dialog" id="modal-ingreso-producto">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6 offset-md-3">
                                    <div class="form-group">
                                        <select class="form-control form-control-sm" v-model="producto.tipo_operacion" @change="tipoOperacion">
                                            <option value="1001"> Operación Gravada</option>
                                            <option value="1003"> Operación Exonerada</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-5">
                            <div class="form-group">
                                <input type="number" class="form-control form-control-sm" v-model="producto.cantidad"/>
                            </div>
                        </div>
                        <div class="col-md-4 col-7">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" placeholder="Código" v-model="producto.codigo" />
                            </div>
                        </div>
                        <div class="col-md-5">
                             <div class="form-group">
                                <select class="form-control form-control-sm" v-model="producto.unidad_medida" >
                                    <option value="NIU">Unidades</option>
                                    <option value="ZZ">Servicios</option>
                                </select>
                            </div>
                        </div>
                    

                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" placeholder="Decripción Detallada" v-model="producto.descripcion" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="row">

                                <div class="col-md-6 offset-md-6">
                                    <div class="form-group">
                                       <input type="text" class="form-control form-control-sm" placeholder="Valor unitario" id="valor_unitario" v-model="producto.valor_unitario" @input="calcularPrecioUnit" @change="formatearNumero" />
                                    </div>
                                </div>
                               

                                <div class="col-md-6 offset-md-6">
                                    <div class="form-group">
                                        <div class="input-group input-group-sm mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" style="background:#fafafa;">IGV 18%</span>
                                            </div>
                                             <input type="text" class="form-control form-control-sm text-end" placeholder="0.00" :disabled="!sin_igv"  :value="sin_igv ? calcularIgvValorUnit : 'Ope. Exonerada'" />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6 offset-md-6">
                                    <div class="form-group">
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control form-control-sm" placeholder="Precio unitario (incluye IGV)" id="precio_unitario" :disabled="!sin_igv" v-model="producto.precio_unitario" @input="calcularValorUnit" @change="formatearNumero"/>
                                            <div class="input-group-append">
                                                <span class="input-group-text" style="background:#fafbfc; border:none;"> <tooltip-igv /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-line"></div>
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6 col-6">
                                    <div class="form-group text-end">
                                        <span>Ope. Gravada</span>
                                    </div>
                                </div>
                                <div class="col-md-6 col-6">
                                     <input type="number" class="form-control form-control-sm text-end" placeholder="0.00" disabled :value="calcularOperacionGravada" />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6 col-6">
                                    <div class="form-group text-end">
                                       <span>IGV</span>
                                    </div>
                                </div>
                                <div class="col-md-6 col-6">
                                     <input type="number" class="form-control form-control-sm text-end" disabled placeholder="0.00" :value="calcularIgv"/>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 mb-3">
                            <div class="row">
                                <div class="col-md-6 col-6">
                                    <div class="form-group text-end">
                                        <b>Importe Total</b>
                                    </div>
                                </div>
                                <div class="col-md-6 col-6">
                                     <input type="number" class="form-control form-control-sm text-end" disabled placeholder="0.00" :value="calcularTotal" />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">	
                                <button type="button" class="btn btn-default btn-sm" @click="cerrarModal()">Cancelar</button>
                                <button type="button" class="btn btn-primary btn-sm btn-emitir float-right" @click="addItem(producto)">Agregar</button>
                            </div>
                        </div>
                    </div>
                </div>
             
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import TooltipIgv from '../../../app/pages/TooltipIgv.vue'

import {useCarrito} from '../../../app/stores/carrito'
export default {
    components:{
        'tooltip-igv':TooltipIgv
    },
    setup(){


        const store = useCarrito();


        const producto = ref({
            id:1,
            tipo_operacion:'1001',
            codigo:'',
            unidad_medida: 'NIU',
            descripcion:'',
            cantidad:1,
            valor_unitario:'',
            precio_unitario:''
        });


        
        const sin_igv = computed(()=>{
            return producto.value.tipo_operacion == '1001' ? true : false;
        })

        const calcularValorUnit = (e) => {
            let precio = Number(e.target.value);
            let operacion = (precio / 1.18);
            producto.value.valor_unitario = (operacion).toFixed(3);
        }

        const calcularIgvValorUnit = computed(()=>{
            let precio = Number(producto.value.valor_unitario);
            let operacion =  (precio * 0.18); 
            return (operacion).toFixed(2);
        });


        const calcularPrecioUnit = (e) => {
            producto.value.precio_unitario = calcularPrecioUnitario.value;
        }

        const tipoOperacion = () =>{
            sin_igv.value ? producto.value.precio_unitario = calcularPrecioUnitario.value : producto.value.precio_unitario = producto.value.valor_unitario;
        }


        const calcularPrecioUnitario = computed(()=>{ 
            let precio = Number(producto.value.valor_unitario);
            let operacion = sin_igv.value ? (precio + Number(calcularIgvValorUnit.value)) : precio;
            return (operacion).toFixed(3);
        })

        const calcularOperacionGravada = computed(()=>{
            let precio = Number(producto.value.valor_unitario);
            let cantidad = Number(producto.value.cantidad);
            let operacion = (precio * cantidad);
            return (operacion).toFixed(2);
        });


        
        const calcularIgv = computed(()=>{
            let igv = Number(calcularIgvValorUnit.value);
            let cantidad = Number(producto.value.cantidad);
            let operacion = sin_igv.value ? (cantidad * igv) : 0;
            return (operacion).toFixed(2);
        });

        const calcularTotal = computed(()=>{
            let precio = Number(producto.value.precio_unitario);
            let cantidad = Number(producto.value.cantidad);
            let operacion = (precio * cantidad);
            return (operacion).toFixed(2);
        })
    


        // const productos = computed	(()=> store.productos);

        // const arrayCarrito = computed(()=> store.arrayCarrito)
        // const {agregarCarrito, arrayCarrito}  = store
        // const {agregarCarrito}  = store

        function addItem(item) {
          
            // invokes function in the store:
            let data ={
                'tipo_operacion':item.tipo_operacion,
                'descripcion': item.descripcion,
                'cantidad':item.cantidad,
                'unidad_medida':item.unidad_medida,
                'valor_unitario':Number(item.valor_unitario).toFixed(2),
                'precio_unitario':Number(item.precio_unitario).toFixed(3),
                'codigo':item.codigo,
                'total':Number(Number(item.precio_unitario) * Number(item.cantidad)).toFixed(2)
            }
            store.agregarCarrito(data)
            cerrarModal();
        }

        const cerrarModal = () =>{
            $('#modal-ingreso-producto').modal('hide');
            limpiar();
        }
        

        function limpiar () {
            producto.value ={
                id:1,
                tipo_operacion:'1001',
                codigo:'',
                unidad_medida: 'NIU',
                descripcion:'',
                cantidad:1,
                valor_unitario:'',
                precio_unitario:''
            };
        }


        function toCurrency(string){
            return string.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1");
        }
   
        function formatearNumero(e){
           
          if(e.target.value != ''){
            let val = parseFloat(e.target.value.replace(",",".")).toFixed(3);
            val = toCurrency(val);
            let op = e.target.id;
            op == 'valor_unitario' ? producto.value.valor_unitario = val : producto.value.precio_unitario = val;
          }
        }



        return{
            producto,
            addItem,
            cerrarModal,
            calcularIgvValorUnit,
            calcularPrecioUnit,
            calcularValorUnit,
            calcularOperacionGravada,
            calcularIgv,
            calcularTotal,
            formatearNumero,
            sin_igv,
            tipoOperacion
        }
    }
}
</script>

<style>
.modal-body{
    background: #fafbfc;
}
.col-line::before {
    content: "Totales";
    position: absolute;
    top: -10px;
    padding: 0 10px;
    background: #fafbfc;
    margin-left: 20px;
    font-size: 14px;
}
.col-line{
    border-bottom: 0.06em solid #eee;
    margin-bottom: 15px;
    position: relative;
}
</style>

