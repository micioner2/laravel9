
<template>
    <i class="fas fa-info-circle i-info" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
    <div class="dropdown-menu"  style="height:125px;">
        <table class="table table-sm" style="margin-top:-9px; font-size:small">
            <tr>
                <td colspan="2" class="text-center">Incluye Impuestos</td>
            </tr>
            <tr>
                <td>V.Unitario</td>
                <td>250.00</td>
                <!-- <td>S/ {{calcularValorUnitario}}</td> -->
            </tr>
            <tr>
                <td>IGV</td>
                <td>25.00</td>
                <!-- <td>S/ {{calcularIGV}}</td> -->
            </tr>
            <tr>
                <td>P.Venta</td>
                <td>275.00</td>
                <!-- <td>S/ {{calcularTotal}}</td> -->
            </tr>
        </table>
    </div>
</template>

<script>
export default {

}
</script>