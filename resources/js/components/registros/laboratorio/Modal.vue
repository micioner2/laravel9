<template>
    <div class="modal" tabindex="-1" role="dialog" id="modal-example">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Resgistrar Laboratorio</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">

                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="">Nombre</label>
                                <input type="text" class="form-control" v-model="data.nombre">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="">Edad</label>
                                <input type="text" class="form-control" v-model="(data.edad)">
                            </div>
                        </div>

                        <!-- <div class="col-md-6">
                            <div class="form-group">
                                <label for="">Especialidad</label>
                                <select class="form-control">
                                    <option value="">A</option>
                                    <option value="">B</option>
                                    <option value="">C</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="">Código</label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="">Pabellón</label>
                                <select class="form-control">
                                    <option value="">A</option>
                                    <option value="">B</option>
                                    <option value="">C</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="">Numéro de Laboratorio</label>
                                <input type="text" class="form-control">
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="mensaje">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    props:{
        data:{
            type: Array,
            Required: true
        },
    },

    setup(props){
        const mensaje = () =>{
            console.log(props.data);
        }
        return {
            mensaje
        }
    }
}
</script>