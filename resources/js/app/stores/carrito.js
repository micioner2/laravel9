import { defineStore } from 'pinia'

export const useCarrito = defineStore('carrito', {
    state: () => {
        return { 
            productos:[],
            arrayCarrito: []
        }
    },
  

    actions: {
        agregarCarrito(producto) {
            this.arrayCarrito.push(producto)
        }
    },

  });