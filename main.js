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
            clase: '',
            culto: '',
            armas: '',
            data: [1,2],
            idEliminar: null,
        };
    },
    mounted(){
        this.data = [];
        if(localStorage.length > 0){
            this.data =  JSON.parse(localStorage.getItem('data'));       
        }
    },
    methods: {
        saveData(e){
            e.preventDefault();
            if(!this.idExists(this.codigo)){
                let obj = {
                    codigo: this.codigo,
                    nombre: this.nombre,
                    genero: this.genero,
                    clase: this.clase,
                    culto: this.culto,
                    armas: this.armas
                }

                console.log(obj);
                console.log(this.data);
                this.data.push(obj);

                localStorage.setItem('data', JSON.stringify(this.data));
                this.codigo = null;
                this.nombre = null;
                this.genero = null;
                this.clase = null;
                this.culto = null;
                this.armas = null;
            }
            else
                console.log('El id ya existe');
        },
        idExists(codigo){
            let datos =  JSON.parse(localStorage.getItem('data'));       
            let ids = [];

            for(let i in datos){
                ids.push(datos[i].codigo);    
            }

            console.log(ids);
            if(ids.includes(codigo)) 
                return true
            else 
                return false
        },
        deleteRow(e){
            e.preventDefault();
            if(this.idExists(this.idEliminar)){
                this.data = JSON.parse(localStorage.getItem('data')); 
                //Eliminar el elemento indicado
                //indexOf devuelve posición
                //splice elimina el elemento
                this.data.splice(this.data.indexOf(this.idEliminar), 1);
                localStorage.setItem('data', JSON.stringify(this.data));
                this.idEliminar = null;
            }
            else 
                console.log('El valor no existe');
        }
    }
});



