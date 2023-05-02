

// cargar boton para la vista 
if(!window.location.pathname.includes('edit')){
    const divEdit = document.getElementById('about');
    const idProf = document.getElementById('idProf');
    fetch('http://localhost:8080/user',{
        headers: {'Authorization' : localStorage.getItem("Authorization")}
    }).then(resp => resp.json()).then(data => {
        if(data.user == idProf.value){
            divEdit.innerHTML+=`<a href="http://localhost:8080/profile/edit/${data.user}">Editar perfil </a>`
            console.log('hola')
        }
    });
    fetch(`http://localhost:8080/image/${idProf.value}`).then(resp => resp.json()).then(data => {
        const {images} = data;
        const tabla = document.getElementById('tabla');
        const options = {
            init(img) {
              img.crossOrigin = 'anonymous'
            }
          };
          let tml;
        images.forEach(element => {
            watermark([`http://localhost:8080/uploads/image/${element.src}`],options)
            .image(watermark.text.lowerRight(`${element.watermartk}`,'#ffffff', 0.5))
            .then(function (img) {
                tml = `
                <div class="mt-4">
                    <h4>${element.title}</h4>
                    <div class="container publicacion mt-1 mb-2 contFoto">
                        <img src="${img.src}" class="w-100 h-auto">
                    </div>
                    <div class="stars">
                        <i class="far fa-star" data-value="1"></i>
                        <i class="far fa-star" data-value="2"></i>
                        <i class="far fa-star" data-value="3"></i>
                        <i class="far fa-star" data-value="4"></i>
                        <i class="far fa-star" data-value="5"></i>
                        <span>${element.stars}</span>
                    </div>      
                    
                    <p>${element.description}</p>
                    <p>${element.tags}</p>

                    <hr>
                </div>
                `;
                tabla.innerHTML+=(tml);
            });
        });
    })
}else{
    /// manejo de actualizacion de perfil ///

const formUpdate = document.getElementById('actualizar');



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
}