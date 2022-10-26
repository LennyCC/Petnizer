console.log("Consola que está en el navegador")
const nombre = document.querySelector('#nombre')
const nacimiento = document.querySelector('#nacimiento')
const visitaTipo = document.querySelector('#visitaTipo')
const proximaVisita = document.querySelector('#proximaVisita')
const controlPienso = document.querySelector('#controlPienso')

console.log({nombre, nacimiento, visitaTipo, proximaVisita, controlPienso})

const addbutton = document.querySelector('add');

addbutton.addEventListener('click', (e) => {
  
    nombre: nombre.value, 
    nacimiento: nacimiento.value,

    fetch('/public/index.html', {
      method: POST, 
      headers {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
     {
        nombre,
        nacimiento
      });
    
    })
  
})