const ulMenu = document.getElementById('menu');
let boton = null;

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
                `;;
                tabla.innerHTML+=(tml);
            });
        });
    });
}

const cargarBarraUsuario = (usuario)=>{
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

    fetch('http://localhost:8080/image/auth',{
        headers: {'Authorization' : localStorage.getItem('Authorization')}
    }).then(resp => resp.json()).then(data => {
        const {response} = data;
        const tabla = document.getElementById('load');
        const options = {
            init(img) {
              img.crossOrigin = 'anonymous'
            }
          };
          let tml;
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
}


main();

