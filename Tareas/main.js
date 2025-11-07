const db = new PouchDB('tareas');
const inputName = document.getElementById("name");
const inputDate = document.getElementById("date");

const btnAdd = document.getElementById("btnAdd");
const btnList = document.getElementById("BtnList");

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker registrado'))
    .catch(err => console.error('Error al registrar SW:', err));
}


btnAdd.addEventListener("click",(event)=>{

    const tarea = {
        _id: new Date().toISOString(),
        nombre: inputName.value,
        fecha: inputDate.value
    }

    db.put(tarea)
    .then((result)=>{
        console.log("exito",result)
        inputName.value = "";
        inputDate.value = "";
    })
    .catch((error)=>{
        console.error(error)
    })  

});


document.getElementById('BtnList').addEventListener('click', mostrarTareas);

async function mostrarTareas() {
  const result = await db.allDocs({ include_docs: true, descending: true });
  const contenedor = document.getElementById('listaTareas');
  contenedor.innerHTML = '';

  result.rows.forEach(row => {
    const div = document.createElement('div');
    div.className = 'tarea';
    div.innerHTML = `<strong>${row.doc.nombre}</strong> - ${row.doc.fecha}`;
    contenedor.appendChild(div);
  });
}


