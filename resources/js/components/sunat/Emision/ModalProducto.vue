<template>
    <div class="modal" tabindex="-1" role="dialog" id="modal-ingreso-producto">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6"></div>
                                <div class="col-md-6 offset-md-3">
                                    <div class="form-group">
                                        <select class="form-control form-control-sm" v-model="producto.tipo_operacion"
                                            @change="tipoOperacion">
                                            <option value="1001"> Operación Gravada</option>
                                            <option value="1003"> Operación Exonerada</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-5">
                            <div class="form-group">
                                <input type="number" class="form-control form-control-sm" v-model="producto.cantidad" min="0" oninput="validity.valid||(value='');"/>
                            </div>
                        </div>
                        <div class="col-md-4 col-7">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" placeholder="Código" v-model="producto.codigo" />
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <select class="form-control form-control-sm" v-model="producto.unidad_medida">
                                    <option value="NIU">Unidades</option>
                                    <option value="ZZ">Servicios</option>
                                </select>
                            </div>
                        </div>


                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" placeholder="Decripción Detallada" id="txt_descripcion" v-model="producto.descripcion"/>
                                <span v-if="v$.descripcion.$error" class="text-red">{{traductorMessage(v$.descripcion.$errors[0].$validator,v$.descripcion.$errors[0].$params.min)}}</span>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="row">

                                <div class="col-md-6 offset-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control form-control-sm" placeholder="Valor unitario" id="txt_valor_unitario" v-model="producto.valor_unitario" @input="calcularPrecioUnit" @change="formatearNumero" />                               
                                        <span v-if="v$.valor_unitario.$error" class="text-red">{{traductorMessage(v$.valor_unitario.$errors[0].$validator)}}</span>
                                    </div>
                                </div>


                                <div class="col-md-6 offset-md-6">
                                    <div class="form-group">
                                        <div class="input-group input-group-sm mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" style="background:#fafafa;">IGV 18%</span>
                                            </div>
                                            <input type="text" class="form-control form-control-sm text-end" placeholder="0.00" disabled
                                                :value="verifica_igv ? calcularIgvValorUnit : 'Ope. Exonerada'" />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6 offset-md-6">
                                    <div class="form-group">
                                        <!-- <div class="input-group mb-3"> -->
                                        <input type="text" class="form-control form-control-sm" placeholder="Precio unitario (incluye IGV)" :disabled="!verifica_igv" v-model="producto.precio_unitario" @input="calcularValorUnit" @change="formatearNumero" />
                                        <span v-if="v$.precio_unitario.$error" class="text-red">{{traductorMessage(v$.precio_unitario.$errors[0].$validator)}}</span>
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
                                    <input type="number" class="form-control form-control-sm text-end" placeholder="0.00" disabled
                                        :value="calcularOperacionGravada" />
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
                                    <input type="number" class="form-control form-control-sm text-end" disabled placeholder="0.00"
                                        :value="calcularIgv" />
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
                                    <input type="number" class="form-control form-control-sm text-end" disabled placeholder="0.00"
                                        :value="calcularTotal" />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">
                                <button type="button" class="btn btn-default btn-sm" @click="cerrarModal()">Cancelar</button>
                                <button v-if="props.opcion_modal" type="button" class="btn btn-primary btn-sm btn-emitir float-right" @click="addItem">Agregar</button>
                                <button v-else type="button" class="btn btn-primary btn-sm btn-emitir float-right" @click="addItem">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>



import useValidate from '@vuelidate/core'
import { required, email, minLength, numeric } from '@vuelidate/validators'
import { computed, onMounted } from 'vue'


import {useCarrito} from '../../../app/stores/carrito'
import { storeToRefs } from 'pinia'

export default {

    props:{
        opcion_modal : {
            type : Boolean,
            default : false
        }
    },

    setup(props) {
        
        const store = useCarrito();
        const producto = storeToRefs(store).producto;
        // const producto = mipe.producto;


        const rules = computed(()=>{
            return {
                descripcion: {
                    required,
                    minLength: minLength(3)
                },
                valor_unitario: { required, numeric },
                precio_unitario:{ required, numeric },
            }
        })

        const v$ = useValidate(rules,producto)

        const traductorMessage = (op,num) =>{
            switch(op){
                case 'required':
                    return 'Campo obligatorio'
                case 'email':
                    return 'Ingrese un email valido'
                case 'minLength':
                    return 'El campo debe tener al menos '+num+' caracteres'
                case 'numeric':
                    return 'Solo se permiten numeros'
                default:
                    return ''
            }
        
        }


        
        const verifica_igv = computed(()=>{
            return producto.value.tipo_operacion == '1001' ? true : false;
        })

        const validarNumber = (valor)=>{
            return !isNaN(valor) ? Number(valor) : 0;
        }

 
        const calcularValorUnit = (e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
            let precio = producto.value.precio_unitario;
            if(!isNaN(precio)){
                let operacion = (Number(precio) / 1.18);
                producto.value.valor_unitario = (operacion).toFixed(3);
            }else{
                producto.value.valor_unitario = '';
            }

        }

        const calcularIgvValorUnit = computed(()=>{
            let precio = validarNumber(producto.value.valor_unitario);
            let operacion =  (precio * 0.18); 
            return (operacion).toFixed(2);
        });


        const calcularPrecioUnit = (e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
            producto.value.precio_unitario = calcularPrecioUnitario.value;
        }

        const tipoOperacion = () =>{
            verifica_igv.value ? producto.value.precio_unitario = calcularPrecioUnitario.value : producto.value.precio_unitario = producto.value.valor_unitario;
        }


        const calcularPrecioUnitario = computed(()=>{ 
            let precio = producto.value.valor_unitario;
            if(!isNaN(precio)){
                let operacion = verifica_igv.value ? (Number(precio) + Number(calcularIgvValorUnit.value)) : Number(precio);
                return (operacion).toFixed(3);
            }else{
                return '';
            }
        })

        const calcularOperacionGravada = computed(()=>{
            let precio = validarNumber(producto.value.valor_unitario) ;
            let cantidad = Number(producto.value.cantidad);
            let operacion = (precio * cantidad);
            return (operacion).toFixed(2);
        });


        
        const calcularIgv = computed(()=>{
            let igv = Number(calcularIgvValorUnit.value);
            let cantidad = Number(producto.value.cantidad);
            let operacion = verifica_igv.value ? (cantidad * igv) : 0;
            return (operacion).toFixed(2);
        });

        const calcularTotal = computed(()=>{
            let precio = validarNumber(producto.value.precio_unitario);
            let cantidad = Number(producto.value.cantidad);
            let operacion = (precio * cantidad);
            return (operacion).toFixed(2);
        })
    

        // const productos = computed	(()=> store.productos);

        // const arrayCarrito = computed(()=> store.arrayCarrito)
        // const {agregarCarrito, arrayCarrito}  = store
        // const {agregarCarrito}  = store

        function addItem() {

            this.v$.$validate() // checks all inputs
            if (!this.v$.$error) {
                let data = producto.value
                let item ={
                    'tipo_operacion':data.tipo_operacion,
                    'descripcion': data.descripcion,
                    'cantidad':data.cantidad,
                    'unidad_medida':data.unidad_medida,
                    'valor_unitario':Number(data.valor_unitario).toFixed(2),
                    'precio_unitario':Number(data.precio_unitario).toFixed(3),
                    'codigo':data.codigo,
                    'total':Number(Number(data.precio_unitario) * Number(data.cantidad)).toFixed(2)
                }
                // Validar Agregar o Editar
                if(props.opcion_modal){
                    store.agregarCarrito(item)
                }else{
                    store.editarCarrito(item)
                }
                cerrarModal();
                this.v$.$reset();
            }

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
            let op = e.target.id;
            if(e.target.value != ''){
                let val = parseFloat(e.target.value.replace(",",".")).toFixed(3);
                val = toCurrency(val);
                op == 'txt_valor_unitario' ? producto.value.valor_unitario = val : producto.value.precio_unitario = val;
            }
        }


        onMounted(()=>{
            $(function () {
                $('#modal-ingreso-producto').on('shown.bs.modal', function (e) {
                    $('#txt_descripcion').focus();
                })
            });
        });


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
            verifica_igv,
            tipoOperacion,
            v$,
            traductorMessage,
            props,
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

input:focus {
    border: 1px solid #3498DB !important;
    outline: none !important;
    box-shadow: 2px 2px rgb(214, 234, 248) !important;
}

.text-red{
    font-size: 14px;
    margin-bottom: 0 !important;
}

</style>

