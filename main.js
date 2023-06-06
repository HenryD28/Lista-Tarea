const nameInput = document.querySelector('#name-input');
const formBtn = document.querySelector('#form-btn');
const form = document.querySelector('#form');
const list = document.querySelector('#list');
const conteo = document.querySelector('#conteo');

let nuevoConteo = (total, completadas, pendientes) => {
    const template = `
    <p class= "conteo">Total : ${total}</p>
    <p class= "conteo">Completada :${completadas}</p>
    <p class= "conteo">Pendiente :${pendientes}</p>
    `;
    conteo.innerHTML =  template;
}

let datosConteo = (list) => {
    const total = list.querySelectorAll('li').length;
    const completadas = list.querySelectorAll('.check')?.length ?? 0;
    const pendiente = total - completadas 
    nuevoConteo  (total, completadas, pendiente);
    

    
};

form.addEventListener('submit', e => {
    e.preventDefault();
    const li = document.createElement('li');
    li.innerHTML = `
    <p class= "text">${nameInput.value}</p>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="check-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>

    `;

    list.append(li);
    nameInput.value = '';
    localStorage.setItem('listaTarea', list.innerHTML);
    datosConteo(list);
});

list.addEventListener('click', e => {
    if (e.target.closest('.delete-icon')) {
        e.target.closest('.delete-icon').parentElement.remove();
        localStorage.setItem('listaTarea', list.innerHTML);
    }

    if (e.target.closest('.check-icon')) {
       const checkIcon = e.target.closest('.check-icon');
       const p = checkIcon.parentElement.children[0];
        localStorage.setItem('listaTarea', list.innerHTML);
        

        if (p.classList.contains('check')) { 
            p.classList.remove('check');
            localStorage.setItem('listaTarea', list.innerHTML);
        
            
        }else {
            
            p.classList.add('check');
            
           
        }
        localStorage.setItem('listaTarea', list.innerHTML);
    }
    datosConteo(list);
    
});


   


(() => {
    const localList = localStorage.getItem('listaTarea');
    list.innerHTML = localList;
    datosConteo(list);
})()


