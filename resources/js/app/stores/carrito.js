import { defineStore } from 'pinia'

export const useCarrito = defineStore('carrito', {
    state: () => {
        return { 
            productos:[],
            arrayCarrito: []
        }
    },

    getters:{
        calcularOperacionGravada(){
            let array = this.arrayCarrito;
            let suma = 0;
            for (let index = 0; index < array.length; index++) {
                suma += Number((array[index].precio_unitario / 1.18) * array[index].cantidad);
            }
            return (suma);
        },

        calcularIgv(){
            let total = this.calcularOperacionGravada;
            let operacion = Number(total * 0.18);
            return (operacion);
        },

        calcularTotal(){
            let operacion = (Number(this.calcularOperacionGravada) + Number(this.calcularIgv));
            return (operacion).toFixed(2);
        }

    },
  

    actions: {
        agregarCarrito(producto) {
            this.arrayCarrito.push(producto)
        },

        deleteItem(index){
            this.arrayCarrito.splice(index,1);
        }
    },

  });