import Vue from 'vue'
export default {
    methods: {
        
        traductorMessage (op,num){
            switch(op){
                case 'required':
                    return 'Campo obligatorio'
                case 'email':
                    return 'Ingrese un email valido'
                case 'minLength':
                    return 'El campo debe tener al menos '+num+' caracteres'
                case 'numeric':
                    return 'Solo se permiten numeros'
                default:
                    return ''
            }
        
        }
    }
}


