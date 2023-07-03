

// cargar boton para la vista 
if(!window.location.pathname.includes('edit')){
    let usuario;
    const divEdit = document.getElementById('about');
    const idProf = document.getElementById('idProf');
    fetch('http://localhost:8080/user',{
        headers: {'Authorization' : localStorage.getItem("Authorization")}
    }).then(resp => resp.json()).then(data => {
        if(data.user == idProf.value){
            divEdit.innerHTML+=`<a href="http://localhost:8080/profile/edit/${data.user}">Editar perfil </a>`
            usuario=true;
        }else{
            usuario = false;
        }
    });
    fetch(`http://localhost:8080/image/${idProf.value}`).then(resp => resp.json()).then(data => {
        const {images,likes} = data;
        const tabla = document.getElementById('tabla');
        const options = {
            init(img) {
              img.crossOrigin = 'anonymous'
            }
          };
          let tml;
          let cont = 1;
        images.forEach(element => {
            watermark([`http://localhost:8080/uploads/image/${element.src}`],options)
            .image(watermark.text.lowerRight(`${element.watermartk}`,'#ffffff', 0.5))
            .then(function (img) {
                if(usuario){
                    tml = `
                    <div class="mt-4">
                        <h4>${element.title}</h4>
                        <span id="eliminar${cont+6}" class="btn btn-danger" onclick="eliminar(${element.id})">Borrar</span>
                        <div class="container publicacion mt-1 mb-2 contFoto">
                            <img src="${img.src}" class="w-100 h-auto">
                        </div>
                        <div class="valoracion">
                            <form class="formVal">
                                <p class="clasificacion">
                                    <span  id="a${element.id}"  class="promedio">${element.stars}</span>
                                    <input type="radio" id="${cont}">
                                    <label onclick="puntuar(5,${element.id})" for="${cont}" class="star"><i class="fa-regular fa-star"></i></label>
                                    <input type="radio" id="${cont+2}">
                                    <label onclick="puntuar(4,${element.id})" for="${cont+2}"class="star"><i class="fa-regular fa-star"></i></label>
                                    <input type="radio" id="${cont+3}">
                                    <label onclick="puntuar(3,${element.id})" for="${cont+3}"class="star"><i class="fa-regular fa-star"></i></label>
                                    <input type="radio" id="${cont+4}">
                                    <label onclick="puntuar(2,${element.id})" for="${cont+4}"class="star"><i class="fa-regular fa-star"></i></label>
                                    <input type="radio" id="${cont+5}">
                                    <label class="star" onclick="puntuar(1,${element.id})" for="${cont+5}"><i class="fa-regular fa-star"></i></label>
                                </p>
                            </form>
                        </div>   
                        
                        <p>${element.description}</p>
                        <p>${element.tags}</p>
    
                        <hr>
                    </div>
                    `;
                }else{
                    if(element.RightId == 1){
                        tml = `
                        <div class="mt-4">
                            <h4>${element.title}</h4>
                            <span id="contactar${cont+6}" class="btn btn-info" onclick="contactar(${element.id})">Contactar Creador</span>
                            <div class="container publicacion mt-1 mb-2 contFoto">
                                <img src="${img.src}" class="w-100 h-auto">
                            </div>
                            <div class="valoracion">
                                <form class="formVal">
                                    <p class="clasificacion">
                                        <span  id="a${element.id}"  class="promedio">${element.stars}</span>
                                        <input type="radio" id="${cont}">
                                        <label onclick="puntuar(5,${element.id})" for="${cont}" class="star"><i class="fa-regular fa-star"></i></label>
                                        <input type="radio" id="${cont+2}">
                                        <label onclick="puntuar(4,${element.id})" for="${cont+2}"class="star"><i class="fa-regular fa-star"></i></label>
                                        <input type="radio" id="${cont+3}">
                                        <label onclick="puntuar(3,${element.id})" for="${cont+3}"class="star"><i class="fa-regular fa-star"></i></label>
                                        <input type="radio" id="${cont+4}">
                                        <label onclick="puntuar(2,${element.id})" for="${cont+4}"class="star"><i class="fa-regular fa-star"></i></label>
                                        <input type="radio" id="${cont+5}">
                                        <label class="star" onclick="puntuar(1,${element.id})" for="${cont+5}"><i class="fa-regular fa-star"></i></label>
                                    </p>
                                </form>
                            </div>   
                            
                            <p>${element.description}</p>
                            <p>${element.tags}</p>
        
                            <hr>
                        </div>
                        `;
                    }else{
                        tml = `
                        <div class="mt-4">
                            <h4>${element.title}</h4>
                            <div class="container publicacion mt-1 mb-2 contFoto">
                                <img src="${img.src}" class="w-100 h-auto">
                            </div>
                            <div class="valoracion">
                                <form class="formVal">
                                    <p class="clasificacion">
                                        <span  id="a${element.id}"  class="promedio">${element.stars}</span>
                                        <input type="radio" id="${cont}">
                                        <label onclick="puntuar(5,${element.id})" for="${cont}" class="star"><i class="fa-regular fa-star"></i></label>
                                        <input type="radio" id="${cont+2}">
                                        <label onclick="puntuar(4,${element.id})" for="${cont+2}"class="star"><i class="fa-regular fa-star"></i></label>
                                        <input type="radio" id="${cont+3}">
                                        <label onclick="puntuar(3,${element.id})" for="${cont+3}"class="star"><i class="fa-regular fa-star"></i></label>
                                        <input type="radio" id="${cont+4}">
                                        <label onclick="puntuar(2,${element.id})" for="${cont+4}"class="star"><i class="fa-regular fa-star"></i></label>
                                        <input type="radio" id="${cont+5}">
                                        <label class="star" onclick="puntuar(1,${element.id})" for="${cont+5}"><i class="fa-regular fa-star"></i></label>
                                    </p>
                                </form>
                            </div>   
                            
                            <p>${element.description}</p>
                            <p>${element.tags}</p>
        
                            <hr>
                        </div>
                        `;
                    }
                }
                tabla.innerHTML+=(tml);
                // if(likes[element.id] != undefined){
                //     value = likes[element.id]
                //     switch(value){
                //         case 1:
                //             document.getElementById(cont).checked = true;
                //             break;
                //         case 2:
                //             document.getElementById(cont+1).checked = true;
                //             break;
                //         case 3:
                //             document.getElementById(cont+2).checked = true;
                //             break;
                //         case 4:
                //             document.getElementById(cont+3).checked = true;
                //             break;
                //         case 5:
                //             document.getElementById(cont+4).checked = true;
                //             break;
                //     }
                // }
                if(usuario){
                    document.getElementById(`eliminar${cont+6}`).innerHTML=`Borrar`
                }
                cont+=10
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
            formData[element.name] = element.value;
        }
    }
    console.log(formData)
    fetch("http://localhost:8080/profile/",{
        method:'POST',
        body: JSON.stringify(formData),
        headers:{'Authorization' : localStorage.getItem("Authorization"), 'Content-Type':'application/json'}
    }).then(resp=>{
        const id = document.getElementById('id').value;
        window.location.href = `http://localhost:8080/profile/${id}`
    }
        )
    // .then(resp => resp.json()).then(({msg})=>{
    //     const toastLiveExample = document.getElementById('liveToast')
    //     toastLiveExample.innerHTML = `
    //     <div class="toast-header">
    //         <img src="..." class="rounded me-2" alt="...">
    //         <strong class="me-auto">Fotaza</strong>
    //         <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    //     </div>
    //     <div class="toast-body">
    //         ${msg}
    //     </div>`
    //     bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    //     toastLiveExample.show()
    // })
    .catch(e => {
        console.error(e);
    })
})
}

const puntuar = (star,posteo)=>{
    let data = {star, posteo}
    fetch('http://localhost:8080/stars',{
        method:'POST',
        body: JSON.stringify(data),
        headers:{'Authorization' : localStorage.getItem("Authorization"), 'Content-Type':'application/json'}})
        .then(resp => resp.json())
        .then(data => {
            document.getElementById(`a${posteo}`).innerHTML = data.promedio ;
        });
}


const eliminar = (idFoto)=>{
    fetch(`http://localhost:8080/image/${idFoto}`,{
        method:'DELETE',
        headers:{'Authorization' : localStorage.getItem("Authorization"), 'Content-Type':'application/json'}})
        .then(resp => resp.json())
        .then(({usuario}) => {
            window.location.href = `http://localhost:8080/profile/${usuario}`
        });
}

const socket = io();

const contactar = (postId)=>{
    socket.emit("contactar",{
        image:postId,
        token:localStorage.getItem('Authorization')
    });
}