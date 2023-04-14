const ulMenu = document.getElementById('menuIndex');
let boton = null;



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
    <li class="nav-item">
        <a class="nav-link" href="./auth.html">Iniciar Sesion | Registrarse</a>
    </li>
    `;

    ulMenu.innerHTML = html;
}

const cargarBarraUsuario = (usuario)=>{
    const html = `
    <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
    <li class="nav-item">
        <a class="nav-link" href="#">Publicar</a>
    </li>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Perfil
        </a>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Editar Perfil</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button id="cerrar" class="dropdown-item">Cerrar Sesion</button></li>
        </ul>
    </li>
    `;

    ulMenu.innerHTML = html;
    boton = document.getElementById('cerrar');
    boton.addEventListener("click",()=>{
        localStorage.removeItem('Authorization');
        window.location = window.location.href = "http://localhost:8080/"
    })
}

main();


