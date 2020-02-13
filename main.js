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

    //Service Worker
    //Validar que el navegador soporte el Service Worker
    if('serviceWorker' in navigator){
        //Llamar al serviceWorker
        navigator.serviceWorker.register('./sw.js', {scope: './'})
        .then(reg => console.log('Registro de ServiceWorker exitoso', reg))
        .catch(err => console.warn('Error al tratar de registrar el ServiceWorker', err))
    }

    //Formulario 
    formu.addEventListener('submit', ()=>{
        let nombre = document.getElementById('nombre');
        let genero = document.getElementById('genero');
        let clase = document.getElementById('clase');
        let culto = document.getElementById('culto');
        let armas = document.getElementById('armas');
        let formu = document.getElementById('formu');

        /*
        let plantilla = `
            <tr>
                <td>${nombre.value}</td>
                <td>${genero.value}</td>
                <td>${clase.value}</td>
                <td>${culto.value}</td>
                <td>${armas.value}</td>
            </tr>
        `;
        */

        let inputs = document.getElementsByTagName('input');

        let tabla = document.getElementById('tabla');
        let fila = tabla.insertRow(tabla.rows.length);
        
        let celda1 = fila.insertCell(0);
        let celda2 = fila.insertCell(1);
        let celda3 = fila.insertCell(2);
        let celda4 = fila.insertCell(3);
        let celda5 = fila.insertCell(4);
        let celda6 = fila.insertCell(5);

        celda1.innerHTML = inputs[0].value;
        celda2.innerHTML = inputs[1].value;
        celda3.innerHTML = inputs[2].value;
        celda4.innerHTML = inputs[3].value;
        celda5.innerHTML = inputs[4].value;
        celda6.innerHTML = '<td class="eliminar"><i class="far fa-trash-alt"></i></td>';
        
        /*
        for(index in inputs){
            fila.insertCell(index)
            console.log(inputs[input].value);
        }
        */

    });


    //Local Storage
    if(typeof Storage !== 'undefined')
        console.log('Localstorage is available');
    else
        console.log('Localstorage is unavailable');
    
    let eliminar = document.getElementById('eliminar');
    eliminar.addEventListener('click', ()=>{
        console.log('click eliminar');
    });

});

