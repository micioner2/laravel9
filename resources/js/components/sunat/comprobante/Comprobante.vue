<template>
    <div class="card card-default">
        <div class="card-header">
            <div class="row">
                <div class="col-md-3 col-sm-6 col-12">
                    <router-link :to="{name:'emisionboleta'}">
                        <div class="info-box info-box-comprobante">
                            <span class="info-box-icon bg-info"><i class="fa fa-cog"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-number">Boleta</span>
                                <span class="info-box-text">Mi empresa ...</span>
                                <!-- <button type="button" class="btn btn-primary btn-xs btn-emitir" @click="direccionar">Ir</button> -->
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="col-md-3 col-sm-6 col-12">
                    <router-link :to="{name:'emisionfactura'}">
                        <div class="info-box info-box-comprobante">
                            <span class="info-box-icon bg-info"><i class="fa fa-cog"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-number">Factura</span>
                                <span class="info-box-text">Mi empresa ...</span>
                                <!-- <button type="button" class="btn btn-primary btn-xs btn-emitir" @click="direccionar">Ir</button> -->
                            </div>
                        </div>
                    </router-link>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup(){
        const direccionar = () =>{

        }
        return{
            direccionar
        }
    }
}
</script>

<style>
.info-box-comprobante{
    cursor: pointer;
}

.info-box-comprobante:hover{
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
}
</style>
