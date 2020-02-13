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

    //Validar que el navegador soporte el Service Worker
    if('serviceWorker' in navigator){
        //Llamar al serviceWorker
        navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Registro de ServiceWorker exitoso', reg))
        .catch(err => console.warn('Error al tratar de registrar el ServiceWorker', err))
    }
});

