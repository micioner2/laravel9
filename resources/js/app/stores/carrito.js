import { defineStore } from 'pinia'

export const useCarrito = defineStore('carrito', {
    state: () => {
        return { 
            producto:{
                tipo_operacion:'1001',
                codigo:'',
                unidad_medida: 'NIU',
                descripcion:'',
                cantidad:1,
                valor_unitario:'',
                precio_unitario:''
            },
            arrayCarrito: [],
            index:0
        }
    },

    getters:{
        calcularOperacionGravada(){
            let array = this.arrayCarrito;
            let suma = 0;
            for (let index = 0; index < array.length; index++) {
                suma += array[index].tipo_operacion == '1001'? Number((array[index].precio_unitario / 1.18) * array[index].cantidad) :Number((array[index].precio_unitario) * array[index].cantidad) ;
            }
            return (suma);
        },

        calcularIgv(){
            let array = this.arrayCarrito;
            let suma = 0;
            for (let index = 0; index < array.length; index++) {
                if(array[index].tipo_operacion == '1001'){
                    suma += Number(Number((array[index].precio_unitario / 1.18) * array[index].cantidad));
                }
            }
            let operacion = (suma * 0.18);
            return operacion;
        },

        calcularTotal(){
            let operacion = (Number(this.calcularOperacionGravada) + Number(this.calcularIgv));
            return (operacion).toFixed(2);
        }

    },
  

    actions: {
        agregarCarrito(item) {
            this.arrayCarrito.push(item);
        },

        editarCarrito(item) {
            this.arrayCarrito[this.index] = item;
        },

        deleteItem(index){
            this.arrayCarrito.splice(index,1);
        }
    },

  });