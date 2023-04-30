/// manejo de actualizacion de perfil ///

const formUpdate = document.getElementById('actualizar');
const formPerfil = document.getElementById('imagenPerfil');
const formFondo = document.getElementById('imagenFondo');

formUpdate.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formData = {};
    for(let element of formUpdate.elements){
        if(element.name.length > 0){
            formData[element.name] = element.value ;
        }
    }
    console.log(formData) // datos formulario
    fetch("http://localhost:8080/profile",{
        method:'POST',
        body: JSON.stringify(formData),
        headers:{'Authorization' : localStorage.getItem("Authorization"), 'Content-Type':'application/json'}
    }).then(res => res.json()).then(response => {
        const {msg,result} = response;
        const toastLiveExample = document.getElementById('liveToast')
        toastLiveExample.innerHTML = `
            <div class="toast-header">
                <img src="..." class="rounded me-2" alt="...">
                <strong class="me-auto">Fotaza</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${msg}
            </div>
            `;
        if(result){
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
            toastBootstrap.show();
        }
    }).catch(e => {
        console.error(e);
    })
})

