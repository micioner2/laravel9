import Vue from 'vue'
export default {
    // created() {
    //     this.dataTable()
    // },
    methods: {
        dataTable(col) {

            let array_colum = [];
            array_colum = col;
            let size_colum = []
            for (let index = 0; index < array_colum.length; index++) {
                size_colum.push({"width":array_colum[index]+'%' });
            }
            setTimeout(() => {
                $("#myTable").DataTable({
                    "pageLength": 10,
                    // "scrollX": false,
                    // scrollY:   "500px",
                    // "scrollCollapse": false,
                    "searching": true,
                    "processing": true,
                    // "order":false,
                    // "order": [[3, 'desc']],
                    "columns": size_colum,
                    // responsive : true,
                    destroy : true,
                    searching: true,
                    "language": {
                        "sProcessing":     "Procesando...",
                        "sLengthMenu":     "Mostrar _MENU_ registros",
                        "sZeroRecords":    "No se encontraron resultados",
                        "sEmptyTable":     "Ningún dato disponible en esta tabla",
                        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
                        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
                        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix":    "",
                        "sSearch":         "Buscar:",
                        "sUrl":            "",
                        "sInfoThousands":  ",",
                        "sLoadingRecords": "Cargando...",
                        "oPaginate": {
                        "sFirst":    "Primero",
                        "sLast":     "Último",
                        "sNext":     "Siguiente",
                        "sPrevious": "Anterior"
                        },
                        "oAria": {
                            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                        }
                    }
                });
              }, 0);
        
        },
    }
}



// export default () =>{
//     this.$nextTick(() =>{
//         $("#myTable").DataTable({
//             "pageLength": 50,
//             "scrollX": false,
//             scrollY:   "500px",
//             "scrollCollapse": false,
//             "searching": true,
//             "processing": true,
//             "language": {
//                 "sProcessing":     "Procesando...",
//                 "sLengthMenu":     "Mostrar _MENU_ registros",
//                 "sZeroRecords":    "No se encontraron resultados",
//                 "sEmptyTable":     "Ningún dato disponible en esta tabla",
//                 "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
//                 "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
//                 "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
//                 "sInfoPostFix":    "",
//                 "sSearch":         "Buscar:",
//                 "sUrl":            "",
//                 "sInfoThousands":  ",",
//                 "sLoadingRecords": "Cargando...",
//                 "oPaginate": {
//                 "sFirst":    "Primero",
//                 "sLast":     "Último",
//                 "sNext":     "Siguiente",
//                 "sPrevious": "Anterior"
//                 },
//                 "oAria": {
//                     "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
//                     "sSortDescending": ": Activar para ordenar la columna de manera descendente"
//                 }
//             }
//         });
//     });
// }