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
                                        <select class="form-control form-control-sm">
                                            <option value=""> Operación Gravada</option>
                                            <option value=""> Operación Exonerada</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-5">
                            <div class="form-group">
                                <input type="number" class="form-control form-control-sm" value="1" />
                            </div>
                        </div>
                        <div class="col-md-4 col-7">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" placeholder="Código" />
                            </div>
                        </div>
                        <div class="col-md-5">
                             <div class="form-group">
                                <select class="form-control form-control-sm">
                                    <option value="">Unidades</option>
                                    <option value="">Servicios</option>
                                </select>
                            </div>
                        </div>
                    

                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-sm" placeholder="Decripción Detallada" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="row">
                                <!-- <div class="col-md-6 offset-md-6">
                                    <div class="form-group">
                                        <tooltip-igv />
                                        <input type="number" class="form-control form-control-sm" placeholder="Valor unitario" />
                                    </div>
                                </div> -->

                                <div class="col-md-6 offset-md-6">
                                    <div class="form-group">
                                        <div class="input-group mb-3">
                                             <input type="number" class="form-control form-control-sm" placeholder="Valor unitario" />
                                            <div class="input-group-append">
                                                <span class="input-group-text"> <tooltip-igv /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               

                                <div class="col-md-6 offset-md-6">
                                    <div class="form-group">
                                        <div class="input-group input-group-sm mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">IGV 18%</span>
                                            </div>
                                             <input type="number" class="form-control form-control-sm text-end" placeholder="0.00" />
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
                                     <input type="number" class="form-control form-control-sm" placeholder="0.00" />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6 col-6">
                                    <div class="form-group text-end">
                                       <span> IGV</span>
                                    </div>
                                </div>
                                <div class="col-md-6 col-6">
                                     <input type="number" class="form-control form-control-sm" placeholder="0.00" />
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
                                     <input type="number" class="form-control form-control-sm" placeholder="0.00" />
                                </div>
                            </div>
                        </div>


                        <div class="col-md-12">
                            <div class="form-group">	
                                <button type="button" class="btn btn-default btn-sm" @click="cerrarModal()">Cancelar</button>
                                <button type="button" class="btn btn-primary btn-sm btn-emitir float-right ">Agregar</button>
                            </div>
                        </div>
                    </div>
                </div>
             
            </div>
        </div>
    </div>
</template>

<script>
import TooltipIgv from '../../../app/pages/TooltipIgv.vue'
export default {
    components:{
        'tooltip-igv':TooltipIgv
    },
    setup(){
        const cerrarModal = () =>{
            // $('#modal-ingreso-producto').modal('hide');
            $('#modal-ingreso-producto').modal('hide')
        }
        return{
            cerrarModal
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

