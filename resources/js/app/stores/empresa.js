import { defineStore } from 'pinia'

export const useEmpresa = defineStore('empresa', {
    state: () => {
        return {
            empresa: {
                ruc: '',
                nombre_legal:'',
                nombre_comercial: '',
                direccion_fiscal: '',
                telefono: '',
                foto: ''
            },
            arrayEmpresa: [],
        }
    }
});