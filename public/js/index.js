const ulMenu = document.getElementById('menu');
let boton = null;
let formularios = new Set();
// cargar imagenes


let usuario = null

const validarJWT = async ()=>{
    const token = localStorage.getItem('Authorization') || '' ;
    if(token.length > 10){
        const resp = await fetch("http://localhost:8080/auth",{
            headers: {'Authorization' : localStorage.getItem('Authorization')}
        });
        const {user , token} = await resp.json();

        localStorage.setItem('Authorization',token)
        usuario = user ;
        cargarBarraUsuario(usuario);
    }else{
        cargarNormal();
    }
}

const main = async ()=>{
    await validarJWT(); 
}

const cargarNormal=()=>{
    const html = `
    <ul class="navbar-nav flex-grow-1" >
        <li class="nav-item">
            <div>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn search" type="submit"><i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i></button>
                </form>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="./auth.html">Iniciar Sesion | Registrarse</a>
        </li>
    </ul>
    `;

    ulMenu.innerHTML = html;

    fetch('http://localhost:8080/image').then(resp => resp.json()).then(data => {
        const {response} = data;
        const tabla = document.getElementById('load');
        let tml;
        const options = {
            init(img) {
              img.crossOrigin = 'anonymous'
            }
          };
        response.forEach(element => {
            watermark([`http://localhost:8080/uploads/image/${element.src}`],options)
            .image(watermark.text.lowerRight(`${element.watermartk}`,'#ffffff', 0.5))
            .then(function (img) {
                tml = `
                <div class="mt-4">
                    <h4>${element.title}</h4>
                    <div class="container publicacion mt-1 mb-2 contFoto">
                        <img src="${img.src}" class="w-100 h-auto">
                    </div>
                    <p>${element.description}</p>
                    <p>${element.tags}</p>

                    <hr>
                </div>
                `;;
                tabla.innerHTML+=(tml);
            });
        });
    });
}

const cargarBarraUsuario = async (usuario)=>{
    const html = `

    <ul class="navbar-nav flex-grow-1" >
        <li class="nav-item">
            <div>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn search" type="submit"><i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i></button>
                </form>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="./post.html">Postear</a>
        </li>
        <li class="nav-item">
            <a class="nav-link ">Galeria</a>
        </li>

        </ul>
          <div class="dropdown" id="drop">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              ${usuario.username}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" >
              <li><form action=""></form>
              <a class="dropdown-item text-dark" href='http://localhost:8080/profile/${usuario.id}'>Mi Perfil</a></li>
              <li><button id="cerrar" class="dropdown-item">Cerrar Sesion</button></li>
            </ul>
          </div>
    `;

// editar <a class="dropdown-item" href="http://localhost:8080/profile/${usuario.id}">Editar Perfil</a>
// cerrar <button id="cerrar" class="dropdown-item">Cerrar Sesion</button>


    ulMenu.innerHTML = html;
    boton = document.getElementById('cerrar');
    boton.addEventListener("click",()=>{
        localStorage.removeItem('Authorization');
        window.location = window.location.href = "http://localhost:8080/"
    });
    await fetch('http://localhost:8080/image/auth',{
        headers: {'Authorization' : localStorage.getItem('Authorization')}
    }).then(resp => resp.json()).then(data => {
        const {response,likes} = data;
        const tabla = document.getElementById('load');
        const options = {
            init(img) {
              img.crossOrigin = 'anonymous'
            }
          };
          let tml;
        let cont = 1;
        response.forEach(element => {
            watermark([`http://localhost:8080/uploads/image/${element.src}`],options)
            .image(watermark.text.lowerRight(`${element.watermartk}`,'#ffffff', 0.5))
            .then(function (img) {
                tml = `
                <div class="mt-4">
                    <h4>${element.title}</h4>
                    <span><a href="http://localhost:8080/profile/${element.UserId}">Visitar creador</a></span>
                    <div class="container publicacion mt-1 mb-2 contFoto">
                        <img src="${img.src}" class="w-100 h-auto">
                    </div>
                    <div class="valoracion">
                        <form class="formVal">
                            <p class="clasificacion">
                                <span id="a${element.id}" class="promedio">${element.stars}</span>
                                <input type="radio" id="${cont}" name="estrellas">
                                <label onclick="puntuar(5,${element.id})" for="${cont}" class="star"><i class="fa-regular fa-star"></i></label>
                                <input type="radio" id="${cont+1}">
                                <label onclick="puntuar(4,${element.id})" for="${cont+1}"class="star"><i class="fa-regular fa-star"></i></label>
                                <input type="radio" id="${cont+2}">
                                <label onclick="puntuar(3,${element.id})" for="${cont+2}"class="star"><i class="fa-regular fa-star"></i></label>
                                <input type="radio" id="${cont+3}">
                                <label onclick="puntuar(2,${element.id})" for="${cont+3}"class="star"><i class="fa-regular fa-star"></i></label>
                                <input type="radio" id="${cont+4}">
                                <label class="star" onclick="puntuar(1,${element.id})" for="${cont+4}"><i class="fa-regular fa-star"></i></label>
                            </p>
                        </form>
                    </div>   
                    <p>${element.description}</p>
                    <p>${element.tags}</p>
                    <hr>
                </div>
                `;
                tabla.innerHTML+=(tml);
                if(likes[element.id] != undefined){
                    value = likes[element.id]
                    switch(value){
                        case 1:
                            document.getElementById(cont).checked = true;
                            break;
                        case 2:
                            document.getElementById(cont+1).checked = true;
                            break;
                        case 3:
                            document.getElementById(cont+2).checked = true;
                            break;
                        case 4:
                            document.getElementById(cont+3).checked = true;
                            break;
                        case 5:
                            document.getElementById(cont+4).checked = true;
                            break;
                    }
                }
                cont += 10;
            });
        });
    });
}


main();

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