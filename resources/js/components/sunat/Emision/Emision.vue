<template>
    <div class="row">
        <div class="col-lg-9 col-md-12 col-sm-12 col-12 offset-lg-1">
            <div class="card card-default">
        <div class="card-header">
            <div class="row">
                <div class="col-12 col-empresa-datos">
                    <div class="row">
                        <div class="col-2 d-none d-md-block">
                            <img src="images/config.png" class="product-image datos-empresa-foto" alt="Product Image">
                        </div>
                        <div class="col-md-5 col-xs-12">
                            <div class="row titulo-empresa">
                                <div class="col-12"><h2 class="empresa-datos">COMERCIAL R & M</h2></div>
                                <div class="col-12"><p class="empresa-datos">RIVERA JIMENEZ FRANCISCO</p></div>
                                <div class="col-12"><p class="empresa-datos">INT. 36 LOTE. 14 ABAS. ACAPULCO, PARIÑAS - TALARA - PIURA</p></div>
                                <div class="col-12"><p class="empresa-datos">Telefono.: 925817787</p></div>
                            </div>
                        </div>
                        <div class="col-md-5 col-xs-12">
                            <div class="row">
                                <div class="col-12 numero-comprobante">
                                    <div class="row">
                                        <div class="col-12 text-center"><b>R.U.C. N° 10476656988</b></div>
                                        <div class="col-12 text-center"><p>FACTURA ELECTRÓNICA</p></div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-5">
                                                    <div class="form-group">
                                                        <select class="form-control form-control-sm">
                                                            <option value="F001">F001</option>
                                                            <option value="F001">F002</option>
                                                            <option value="F001">F003</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-1" style="margin:0">
                                                    <div class="form-group">
                                                        <b>-</b>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-group">
                                                        <input type="text" class="form-control form-control-sm" value="0001" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 mb-4">
                    <div class="row">
                        <div class="col-md-7">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" placeholder="Cliente" v-model="cliente.nombre" />
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <div class="input-group mb-3">
                                    <select class="form-control col-3 form-control-sm" v-model="cliente.tipo_documento">
                                        <option :value="1">DNI</option>
                                        <option :value="6">RUC</option>
                                    </select>
                                    <input type="text" class="form-control col-8 form-control-sm" id="txt_documento" maxlength="8" v-model="cliente.documento" @input="consultarDocumento" @keydown="handleInput">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-default my-group-button btn-sm" type="submit">
                                            <i class="icon-load" v-if="opcion_icono"></i>
                                            <i class="fa fa-search" v-else></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p class="span-alert text-red" v-if="opcion_text_alert_documento">DNI inválido</p>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" placeholder="Dirección" v-model="cliente.direccion" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-9 col-5">
                                    <div class="form-group">
                                        <span>F. de Emisión</span>
                                    </div>
                                </div>
                                <div class="col-md-3 col-7">
                                    <input type="date" class="form-control form-control-sm" v-model="comprobante.fecha_emision" :min="fecha_minima" :max="fecha_actual"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <select class=" form-control form-control-sm">
                                    <option>Venta Interna (productos/servicios)</option>
                                    <option>Otros</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <select class=" form-control form-control-sm">
                                    <option>PEN - (S/) Sol</option>
                                    <option>USD - ($/) Dollar</option>
                                    <option>EUR - (€/) Euro</option>
                                </select>
                            </div>
                        </div>
                      
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="row justify-content-center align-items-center minh-100">
                        <div class="col-md-3">
                           <div class="form-group">
                                <button class="btn btn-default btn-sm btn-block btn-agregar-producto" @click="abrirModalProducto()"><i class="fa fa-plus"></i>&nbsp;&nbsp;Agregar un Item</button>
                           </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table table-sm table-bordered table-producto text-nowrap">
                            <thead>
                                <tr>
                                    <th width="10%">CANT</th>
                                    <th width="10%">CÓDIGO</th>
                                    <th width="50%">DESCRIPCIÓN</th>
                                    <th width="10%">P.UNIT</th>
                                    <th width="10%">TOTAL</th>
                                    <th width="10%">OPCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in store.arrayCarrito" :key="index">
                                    <td class="text-center" v-text="item.cantidad"></td>
                                    <td v-text="item.codigo"></td>
                                    <td v-text="item.descripcion"></td>
                                    <td class="text-end" v-text="item.precio_unitario"></td>
                                    <td class="text-end" v-text="item.total"></td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-warning btn-xs" @click="editarProducto(index)"><i class="fa fa-edit"></i></button> 
                                            &nbsp;&nbsp;
                                             <button type="button" class="btn btn-danger btn-xs" @click="store.deleteItem(index)"><i class="fa fa-times"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td class="text-end" colspan="4">Ope. Gravada:</td>
                                    <td class="text-end">{{toCurrency((store.calcularOperacionGravada).toFixed(2))}}</td>
                                </tr>
                                <tr>
                                    <td class="text-end" colspan="4">IGV:</td>
                                    <td class="text-end">{{toCurrency((store.calcularIgv).toFixed(2))}}</td>
                                </tr>
                                <tr>
                                    <td class="text-end" colspan="4">Importe Total:</td>
                                    <td class="text-end">{{toCurrency(store.calcularTotal)}}</td>
                                </tr>
                            </tfoot>

                        </table>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="row justify-content-center align-items-center minh-100">
                        <div class="col-md-12">
                           <div class="form-group">
                                <button class="btn btn-default btn-sm btn-block btn-agregar-producto" @click="abrirModalNota"><i class="fa fa-plus"></i>&nbsp;&nbsp;Agregar Observaciones o Notas</button>
                           </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group">
                        <button class="btn btn-primary btn-sm float-right btn-emitir">Emitir Boleta de Venta</button>
                    </div>
                </div>
                
            </div>
        </div>
        <modal-producto :opcion_modal="opcion_modal"/>
        <modal-nota />
    </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import ModalProducto from './ModalProducto.vue'
import ModalNota from './ModalNota.vue'
import moment from 'moment';
import {useCarrito} from '../../../app/stores/carrito';

export default {
    components:{
        'modal-producto':ModalProducto,
        'modal-nota' : ModalNota
    },
    setup(){
        const store = useCarrito();

        const fecha_actual = moment().format("YYYY-MM-DD");
        const fecha_minima = moment().subtract(4, 'days').format("YYYY-MM-DD");

        const cliente = ref({
            tipo_documento:'1',
            documento:'',
            nombre:'',
            direccion:''
        });

        const comprobante = ref({
            fecha_emision: moment().format("YYYY-MM-DD"),
            tipo_venta:''
        });
        const opcion_icono = ref(false);
        const opcion_text_alert_documento = ref(false);
        const max_length = 8;

        const opcion_modal = ref(true);



        const abrirModalProducto = () =>{
            opcion_modal.value = true;
            $('#modal-ingreso-producto').modal({backdrop: 'static', keyboard: false}) 
        }

        const editarProducto = (index) => {
            opcion_modal.value = false;
            store.index = index;
            let item = store.arrayCarrito[index];
            store.producto = {
                tipo_operacion:item.tipo_operacion,
                codigo:item.codigo,
                unidad_medida: item.unidad_medida,
                descripcion:item.descripcion,
                precio_unitario:item.precio_unitario,
                cantidad:item.cantidad,
                valor_unitario: item.valor_unitario,
                total:item.total
            }
            $('#modal-ingreso-producto').modal({backdrop: 'static', keyboard: false}) 
        }

        async function consultarDocumento (e) {
            // Validar el maximo de caracteres
            let cant = Number(e.target.value.length);
            let longitud = 8;

            // Validar que el texto ingresado sea solo numeros;
            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
            // alerta
            if(cant >= 1 && cant <= 7) {
                $('#txt_documento').addClass('is-invalid');
                opcion_text_alert_documento.value = true;
            }else{
                $('#txt_documento').removeClass('is-invalid');
                opcion_text_alert_documento.value = false;
            }
            // cant > longitud ? e.target.value = e.target.value.slice(0, longitud) : ''
           if(cant >= longitud){
            opcion_icono.value = true
                var ruta = 'https://apiperu.dev/api/dni/'+cliente.value.documento+'?api_token=53972ac26112c49a8c2f374ee59d72d1784601b90a573cfcc8e77032142868b4';
                const response = await fetch(ruta);
                const data = await response.json();
                setTimeout(()=>{
                    if(data.success){
                        cliente.value = {...cliente.value,'nombre':data.data.nombre_completo, 'documento':cliente.value.documento,'direccion':data.data.direccion}
                        opcion_icono.value = false
                    }else{
                        opcion_icono.value = false
                        alert("No pudimos obtener datos del DNI " +cliente.value.documento );
                        cliente.value = {...cliente.value,'nombre':'','direccion':''}
                    } 
                }, 1000);
           
            }
        }

        const handleInput = (e) =>{

            let cant = e.target.value.length;
          
            if(e.key === "Backspace" || e.key === "ArrowLeft"){
                if(cant <= 8){
                    cliente.value = {...cliente.value,'nombre':'','direccion':''}
                }
            }
        }

        function toCurrency(string){
            return string.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }

        const abrirModalNota = () => {
            $('#modal-nota').modal({backdrop: 'static', keyboard: false}) 
        }

        const calendar = ()  => {
            // Calendario 
        }
        return {   
            opcion_icono,
            max_length,
            opcion_text_alert_documento,
            cliente,
            comprobante,
            abrirModalProducto,
            editarProducto,
            consultarDocumento,
            handleInput,
            store,
            toCurrency,
            opcion_modal,
            abrirModalNota,
            fecha_actual,
            fecha_minima
        }
    }
}
</script>




                          


<style>
                  

.col-empresa-datos{
    margin-bottom: 25px;
}

.datos-empresa-foto{
    width: 35% !important;
    margin-top: 0px;
    margin-left: 20px;
}
.titulo-empresa .empresa-datos{
    margin-bottom: 0 !important;
   
}
.titulo-empresa h2{
    font-size: 22px;
    font-weight: bold;
}
.titulo-empresa p{
    font-size: 13px;
}

.numero-comprobante{
    border: dashed 1px #111;
}

.select-comprobante{
    width: 10% !important;
}

.btn-agregar-producto{
    border: dashed 0.5px #111 !important;
}

.table-producto thead {
    background: #eeeff0;
}
.table-producto thead th{
    border: none;
    font-size: 14px;
    font-weight: normal;
}

.table-producto thead, tfoot{
    border-top: 0.05em solid #eeeff0 !important;
}

.table-producto tfoot tr{
    border:none !important;
}


.btn-emitir{
    background: #307ab9 !important;
}

.btn-emitir:hover{
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
}


.icon-load:before {
    opacity: 0.65;
    content: "\f110";
    font-weight: 600;
    display: inline-block;
    font: normal normal normal 2px/3;
    font-family: "Font Awesome 5 Free";
    font-size: medium;
    -webkit-font-smoothing: antialiased;
    text-rendering: auto;
    line-height: 1;
    animation: fa-spin 0.3s infinite steps(10);
}


.span-alert{
    margin-left: 25% !important;
    margin-top: -18px !important;
    font-size: 15px;
}

</style>