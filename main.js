window.addEventListener('load', () => {
    let images = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg',];
    let next = document.getElementById('next');
    let back = document.getElementById('back');
    let img = document.getElementById('img');
    let p = document.getElementsByTagName('p')[0];
    let contador = 0, flag = 'next';

    function interval(){
        let timer = setInterval(function(){
            contador = cambiarCuenta(contador, flag);
            //Cambiar imagen
            img.src = 'img/' + images[contador];
            p.innerHTML = images[contador];
        }, 3000);
        return timer; //Retornar el setInterval
    }

    var time = interval();

    function cambiarCuenta(contador, flag){
        if(flag == 'next'){
            if(contador == images.length-1)
                contador = 0;
            else 
                contador++;
        }
        else if(flag == 'back'){
            if(contador == 0)
                contador = images.length - 1;
            else 
                contador--;
        }        
        return contador;
    }

    next.addEventListener('click', ()=>{
        clearInterval(time);
        flag = 'next';
        contador = cambiarCuenta(contador, flag);
        img.src = 'img/' + images[contador];
        time = interval();
        console.log(images[contador]);
        p.innerHTML = images[contador];
    })

    back.addEventListener('click', ()=>{
        clearInterval(time);
        flag = 'back';
        contador = cambiarCuenta(contador, flag);
        img.src = 'img/' + images[contador];
        time = interval();
        console.log(images[contador]);
        p.innerHTML = images[contador];
    })

    var tabla = document.getElementById('tabla');

    function deleteRows(tabla){
        console.log(localStorage.length);
        for(let i = 1; i < localStorage.length - 1; i++){
            tabla.deleteRow(i);
        }
    }

    function agregarDatos(){
        if(localStorage.length > 0){
            for(let i = 0; i < localStorage.length; i++){
                if(localStorage.getItem(localStorage.key(i)) !== 'null'){
                    let fila = tabla.insertRow();
                    
                    let celda1 = fila.insertCell(0);
                    let celda2 = fila.insertCell(1);
                    let celda3 = fila.insertCell(2);
                    let celda4 = fila.insertCell(3);
                    let celda5 = fila.insertCell(4);      
                    let celda6 = fila.insertCell(5); 

                    let row = JSON.parse(localStorage.getItem(localStorage.key(i)));
                    console.log(row);
                    
                    celda1.innerHTML = row.id;
                    celda2.innerHTML = row.nombre;
                    celda3.innerHTML = row.genero;
                    celda4.innerHTML = row.clase;
                    celda5.innerHTML = row.culto;
                    celda6.innerHTML = row.armas;
                }                        
            }
        }
    }

    agregarDatos();

    //Formulario Agregar
    formu.addEventListener('submit', ()=>{
        deleteRows(tabla);
        //Local Storage
        if(typeof Storage !== 'undefined')
            console.log('Localstorage is available');
        else
            console.log('Localstorage is unavailable');

        let id = document.getElementById('codigo');
        let nombre = document.getElementById('nombre');
        let genero = document.getElementById('genero');
        let clase = document.getElementById('clase');
        let culto = document.getElementById('culto');
        let armas = document.getElementById('armas');
        
        //Guardar en localStorage
        let row = {
            id: id.value,
            nombre: nombre.value,
            genero: genero.value,
            clase: clase.value,
            culto: culto.value,
            armas: armas.value,
        }

        localStorage.setItem(id.value, JSON.stringify(row));
        agregarDatos();
        location.reload();
    });

    //Formulario Eliminar
    let formularioEliminar = document.getElementById('formEliminar');

    formularioEliminar.addEventListener('submit', () => {
        let idEliminar = document.getElementById('idEliminar');

        if(localStorage.getItem(idEliminar.value) !== 'null'){
            localStorage.removeItem(idEliminar.value);
            location.reload();
        }
        else
            console.log('Valor inválido');            
    })

    //Service Worker
    //Validar que el navegador soporte el Service Worker
    if('serviceWorker' in navigator){
        //Llamar al serviceWorker
        navigator.serviceWorker.register('./sw.js', {scope: './'})
        .then(reg => console.log('Registro de ServiceWorker exitoso', reg))
        .catch(err => console.warn('Error al tratar de registrar el ServiceWorker', err))
    }
});

