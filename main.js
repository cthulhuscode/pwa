//Service Worker
    //Validar que el navegador soporte el Service Worker
    if('serviceWorker' in navigator){
        //Llamar al serviceWorker
        navigator.serviceWorker.register('./sw.js', {scope: './'})
        .then(reg => console.log('Registro de ServiceWorker exitoso', reg))
        .catch(err => console.warn('Error al tratar de registrar el ServiceWorker', err))
    }

//Slider
const slider = new Vue({
    el: '#slider',
    data(){
        return{
            images: ['./assets/img/1.jpg', './assets/img/2.jpg', './assets/img/3.jpg', './assets/img/4.jpg', './assets/img/5.jpg'],
            timer: null,
            currentIndex: 0,
            flag: 'next'
        }                    
    },

    mounted(){
        this.timer = this.startSlider();
    },

    methods: {
        startSlider(){
            let timer = setInterval(()=>{
                this.switcher();
            }, 3000);
            return timer;
        },
        next(){
            this.flag = 'next';
            this.switcher();
            clearInterval(this.timer);
            this.timer = this.startSlider();
        },
        prev(){
            this.flag = 'back';
            this.switcher();
            clearInterval(this.timer);
            this.timer = this.startSlider();
        },
        switcher(){
            if(this.flag == 'next'){
                if(this.currentIndex == this.images.length - 1)
                    this.currentIndex = 0;
                else
                    this.currentIndex++;
            }

            if(this.flag == 'back'){
                if(this.currentIndex == 0)
                    this.currentIndex = this.images.length - 1;
                else
                    this.currentIndex--;
            }
        }
    },
});


// Form
const form = new Vue({
    el: "#formtabla",
    data(){
        return{
            codigo: '',
            nombre: '',
            genero: '',
            fecha: '',
            email: '',
            armas: '',
            data: []
        };
    },
    mounted(){
        this.data = this.data || [];
        if(localStorage.length > 0){
            this.data = JSON.parse(localStorage.getItem('data'));       
        }
    },
    methods: {
        saveData(e){
            e.preventDefault();
            this.data = this.data || [];
            if(!this.idExists(this.codigo) && this.notEmptyValues()){
                if(this.tryParseInt(this.codigo, false) != false && this.hasOnlyLetters(this.nombre) && this.hasOnlyLetters(this.genero) && this.hasOnlyLetters(this.armas) && this.isEmailValid(this.email) && this.isDateValid(this.fecha)){
                    let obj = {
                        codigo: this.codigo,
                        nombre: this.nombre,
                        genero: this.genero,
                        fecha: this.fecha,
                        email: this.email,
                        armas: this.armas
                    }
    
                    console.log(obj);
                    this.data.push(obj);
    
                    localStorage.setItem('data', JSON.stringify(this.data));
                    this.codigo = null;
                    this.nombre = null;
                    this.genero = null;
                    this.fecha = null;
                    this.email = null;
                    this.armas = null;
                    
                    //Asignar valor a la propiedad data del componente table para que se actualice
                    table.data = this.data;
                }
                else{
                    console.log('Los campos no se han llenado correctamente')
                }
            }
            else
                console.log('Valor inválido o faltante');
        },
        idExists(codigo){
            let datos =  JSON.parse(localStorage.getItem('data'));       
            let ids = [];

            for(let i in datos){
                ids.push(datos[i].codigo);    
            }

            console.log(ids);
            if(ids.includes(codigo)){
                console.log('El código ya existe');
                return true
            }
            else 
                return false
        },
        notEmptyValues(){
            try{
                if(this.codigo.trim().length > 0 && this.nombre.trim().length > 0 && this.genero.trim().length > 0 && this.fecha.trim().length > 0 && this.email.trim().length > 0 && this.armas.trim().length > 0 && this.isEmailValid(this.email))
                    return true
                else 
                    return false
            }
            catch(err){
                console.log('Hacen falta campos por completar');
            }
        },
        tryParseInt(str,defaultValue) {
            var retValue = defaultValue;
            if(str !== null) {
                if(str.length > 0) {
                    if (!isNaN(str)) {
                        retValue = parseInt(str);
                    }
                }
            }
            return retValue;
       },
       hasOnlyLetters(value){
           //Regular expression for names
            if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value) == true)
                return true;
            else
                return false;
       },
       isEmailValid(value){
           //RegExp from https://emailregex.com/
           
           if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))
            return true;
           else
            return false;
       },
       isDateValid(value){
           //RegExp from https://www.regular-expressions.info/dates.html

           if(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(value))
            return true;
           else
            return false;
       }
    }
});

//Tabla
const table = new Vue({
    el: '#tabla',
    data(){
        return{
            data: JSON.parse(localStorage.getItem('data'))
        }
    },
});

const formEliminar = new Vue({
    el: '#formEliminar',
    data(){
        return{
            idEliminar: null
        }
    },
    methods: {
        deleteRow(e){
            e.preventDefault();
            if(this.idExists(this.idEliminar)){
                let data = JSON.parse(localStorage.getItem('data')); 
                //Eliminar el elemento indicado
                //indexOf devuelve posición
                //splice elimina el elemento
                data.splice(this.getIndexNum(this.idEliminar), 1);
                localStorage.setItem('data', JSON.stringify(data));
                table.data = data;
                form.data = data;
                this.idEliminar = null;
            }
            else 
                console.log('El valor no existe');
        },
        idExists(codigo){
            let datos =  JSON.parse(localStorage.getItem('data'));       
            let ids = [];

            for(let i in datos){
                ids.push(datos[i].codigo);    
            }

            console.log(ids);
            if(ids.includes(codigo)){
                console.log('El código ya existe');
                return true
            }
            else 
                return false
        },
        getIndexNum(value){
            let datos =  JSON.parse(localStorage.getItem('data'));       
            let ids = [];

            for(let i in datos){
                ids.push(datos[i].codigo);    
            }

            return ids.indexOf(value)
        }
    }
})

