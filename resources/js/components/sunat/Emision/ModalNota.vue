<template>
    <div class="modal" tabindex="-1" role="dialog" id="modal-nota">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-8">
                            <input type="text" class="form-control form-control-sm" id="txt_nota" placeholder="Observación o Nota"  />
                        </div>
                        <div class="col-md-3">
                            <button type="button" class="btn btn-default btn-block btn-sm" >Agregar</button>
                        </div>
                        <div class="col-md-1">
                            <button type="button" class="btn btn-default btn-sm" data-dismiss="modal"><i class="fa fa-times"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
export default {
    setup(){
        onMounted(() => {
            $('#modal-nota').css('top', $(window).outerHeight() / 3 - ($(".modal-dialog").outerHeight()) / 2 + 'px');
        })
        
        onMounted(()=>{
            $(function () {
                $('#modal-nota').on('shown.bs.modal', function (e) {
                    $('#txt_nota').focus();
                })
            });
        });
    }
}
</script>

