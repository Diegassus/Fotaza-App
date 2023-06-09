const ulMenu = document.getElementById("menu");
let boton = null;
let formularios = new Set();
const socket = io();
// cargar imagenes

let usuario = null;

const validarJWT = async () => {
  const token = localStorage.getItem("Authorization") || "";
  if (token.length > 10) {
    const resp = await fetch("http://localhost:8080/auth", {
      headers: { Authorization: localStorage.getItem("Authorization") },
    });
    const { user, token } = await resp.json();

    localStorage.setItem("Authorization", token);
    usuario = user;
    cargarBarraUsuario(usuario);
  } else {
    cargarNormal();
  }
};

const main = async () => {
  await validarJWT();
};

const cargarNormal = () => {
  const html = `
    <ul class="navbar-nav flex-grow-1" >
        <li class="nav-item">
            <div>
                <form class="d-flex" role="search" id="busqueda">
                    <input class="form-control me-2" type="search" placeholder="Buscar Etiquetas" aria-label="Search" id="tags">
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
  busqueda = document.getElementById("busqueda");
  busqueda.addEventListener("submit", (e) => {
    e.preventDefault(); // mostrar todos los post publicos con esa etiqueta
    const tag = document.getElementById("tags").value;
    if (tag == "") return;
    fetch(`http://localhost:8080/image/tag/${tag}`)
      .then((resp) => resp.json())
      .then((data) => {
        const { response } = data;
        const tabla = document.getElementById("load");
        tabla.innerHTML = "";
        let tml;
        const options = {
          init(img) {
            img.crossOrigin = "anonymous";
          },
        };
        if (response.length == 0) {
          tabla.innerHTML = "No hay imagenes para cargar!";
          return;
        }
        response.forEach((element) => {
          watermark(
            [`http://localhost:8080/uploads/image/${element.src}`],
            options
          )
            .image(
              watermark.text.lowerRight(`${element.watermartk}`, "#ffffff", 0.5)
            )
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
                `;
              tabla.innerHTML += tml;
            });
        });
      });
  });

  fetch("http://localhost:8080/image")
    .then((resp) => resp.json())
    .then((data) => {
      const { response } = data;
      const tabla = document.getElementById("load");
      let tml;
      const options = {
        init(img) {
          img.crossOrigin = "anonymous";
        },
      };
      if (response.length == 0) {
        tabla.innerHTML = "No hay imagenes para cargar!";
        return;
      }
      response.forEach((element) => {
        watermark(
          [`http://localhost:8080/uploads/image/${element.src}`],
          options
        )
          .image(
            watermark.text.lowerRight(`${element.watermartk}`, "#ffffff", 0.5)
          )
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
                `;
            tabla.innerHTML += tml;
          });
      });
    });
};

const cargarBarraUsuario = async (usuario) => {
  const html = `

    <ul class="navbar-nav flex-grow-1" >
        <li class="nav-item">
            <div>
                <form class="d-flex" role="search" id="busqueda">
                    <input class="form-control me-2" type="search" placeholder="Buscar Etiquetas" aria-label="Search" id="tags">
                    <button class="btn search" type="submit"><i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i></button>
                </form>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="./post.html">Postear</a>
        </li>
        <li class="nav-item">
            <a class="nav-link " href="./galeria.html">Galeria</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="./categorias.html">Categorias</a>
        </li>
        <li class="nav-item">
          <div id="notification" class="notification dropdown"><div class="dropdown-content" id="drop">
          
          </div></div>
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

  const $bell = document.getElementById("notification");
  // realizar el socket tanto aca como en notificacion.js

  let contactos = [];
  let imagen = [];
  fetch("http://localhost:8080/notification", {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  })
    .then((resp) => resp.json())
    .then(({ notificaciones, imagenes }) => {
      if (imagenes.length > 0) {
        $bell.setAttribute("data-count", imagenes.length);
        $bell.classList.add("show-count");
        $bell.classList.add("notify");
        notificaciones.forEach((element) => {
          contactos.push(element);
        });
        imagenes.forEach((element) => {
          imagen.push(element);
        });
      }
    });

  setTimeout(() => {
    fetch("http://localhost:8080/notification", {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    })
      .then((resp) => resp.json())
      .then(({ notificaciones, imagenes }) => {
        if (imagenes.length > 0) {
          $bell.setAttribute("data-count", imagenes.length);
          $bell.classList.add("show-count");
          $bell.classList.add("notify");
          notificaciones.forEach((element) => {
            contactos.push(element);
          });
          imagenes.forEach((element) => {
            imagen.push(element);
          });
        }
      });
  }, 2 * 60 * 1000);

  $bell.addEventListener("animationend", function (event) {
    $bell.classList.remove("notify");
  });
  let mostrar = false;
  $bell.addEventListener("click", () => {
    let n = 1;
    if (mostrar) {
      document.getElementById("drop").style.display = "none";
      document.getElementById("drop").innerHTML = "";
    } else {
      contactos.forEach((element) => {
        document.getElementById("drop").style.display = "block";
        fetch(
          `http://localhost:8080/notification/${element.UserId}/${element.ImageId}`
        )
          .then((resp) => resp.json())
          .then(({ imagen, usuario }) => {
            document.getElementById("drop").innerHTML += `
          <div class="notif-cont" id="n${n}">
            <div class="notif-head"><span>Alguien esta interesado!</span></div>
            <div class="notif-body">
              <p>${usuario} esta interesado en <b>${imagen}</b></p>
            </div>
          </div>
          `;
          fetch(`http://localhost:8080/notification/${element.UserId}/${element.ImageId}`, {
            method: "post",
          }).then((resp) => resp.json()).then((data) => {
            console.log(data);
          });
          });
        n++;
      });
    }
    mostrar = !mostrar;
  });

  boton = document.getElementById("cerrar");
  boton.addEventListener("click", () => {
    localStorage.removeItem("Authorization");
    window.location = window.location.href = "http://localhost:8080/";
  });
  busqueda = document.getElementById("busqueda");
  busqueda.addEventListener("submit", (e) => {
    e.preventDefault(); // mostrar todos los post publicos con esa etiqueta
    const tag = document.getElementById("tags").value;
    if (tag == "") return;
    fetch(`http://localhost:8080/image/tagAuth/${tag}`, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const { response, likes } = data;
        const tabla = document.getElementById("load");
        tabla.innerHTML = "";
        let tml;
        let cont = 1;
        const options = {
          init(img) {
            img.crossOrigin = "anonymous";
          },
        };
        if (response.length == 0) {
          tabla.innerHTML = "No hay imagenes para cargar!";
          return;
        }
        response.forEach((element) => {
          watermark(
            [`http://localhost:8080/uploads/image/${element.src}`],
            options
          )
            .image(
              watermark.text.lowerRight(`${element.watermartk}`, "#ffffff", 0.5)
            )
            .then(function (img) {
              tml = `
                <div class="mt-4">
                    <h4>${element.title}</h4>
                    <span><a href="http://localhost:8080/profile/${
                      element.UserId
                    }">Visitar creador</a></span>
                    <div class="container publicacion mt-1 mb-2 contFoto">
                        <img src="${img.src}" class="w-100 h-auto">
                    </div>
                    <div class="valoracion">
                        <form class="formVal">
                            <p class="clasificacion">
                                <span id="a${element.id}" class="promedio">${
                element.stars
              }</span>
                                <input type="radio" id="${cont}" name="estrellas">
                                <label onclick="puntuar(5,${
                                  element.id
                                })" for="${cont}" class="star"><i class="fa-regular fa-star"></i></label>
                                <input type="radio" id="${cont + 1}">
                                <label onclick="puntuar(4,${
                                  element.id
                                })" for="${
                cont + 1
              }"class="star"><i class="fa-regular fa-star"></i></label>
                                <input type="radio" id="${cont + 2}">
                                <label onclick="puntuar(3,${
                                  element.id
                                })" for="${
                cont + 2
              }"class="star"><i class="fa-regular fa-star"></i></label>
                                <input type="radio" id="${cont + 3}">
                                <label onclick="puntuar(2,${
                                  element.id
                                })" for="${
                cont + 3
              }"class="star"><i class="fa-regular fa-star"></i></label>
                                <input type="radio" id="${cont + 4}">
                                <label class="star" onclick="puntuar(1,${
                                  element.id
                                })" for="${
                cont + 4
              }"><i class="fa-regular fa-star"></i></label>
                            </p>
                        </form>
                    </div>   
                    <p>${element.description}</p>
                    <p>${element.tags}</p>
                    <hr>
                </div>
                `;
              tabla.innerHTML += tml;
              // if (likes[element.id] != undefined) {
              //   value = likes[element.id];
              //   switch (value) {
              //     case 1:
              //       document.getElementById(cont).checked = true;
              //       break;
              //     case 2:
              //       document.getElementById(cont + 1).checked = true;
              //       break;
              //     case 3:
              //       document.getElementById(cont + 2).checked = true;
              //       break;
              //     case 4:
              //       document.getElementById(cont + 3).checked = true;
              //       break;
              //     case 5:
              //       document.getElementById(cont + 4).checked = true;
              //       break;
              //   }
              // }
              cont += 10;
            });
        });
      });
  });
  await conectarSocket(); // conecto socket
  await fetch("http://localhost:8080/image/auth", {
    headers: { Authorization: localStorage.getItem("Authorization") },
  })
    .then((resp) => resp.json())
    .then((data) => {
      const { response, likes } = data;
      const tabla = document.getElementById("load");
      const options = {
        init(img) {
          img.crossOrigin = "anonymous";
        },
      };
      let tml;
      let cont = 1;
      if (response.length == 0) {
        tabla.innerHTML = "No hay imagenes para cargar!";
        return;
      }
      response.forEach((element) => {
        watermark(
          [`http://localhost:8080/uploads/image/${element.src}`],
          options
        )
          .image(
            watermark.text.lowerRight(`${element.watermartk}`, "#ffffff", 0.5)
          )
          .then(function (img) {
            tml = `
                <div class="mt-4">
                    <h4>${element.title}</h4>
                    <span><a href="http://localhost:8080/profile/${
                      element.UserId
                    }">Visitar creador</a></span>
                    <div class="container publicacion mt-1 mb-2 contFoto">
                        <img src="${img.src}" class="w-100 h-auto">
                    </div>
                    <div class="valoracion">
                        <form class="formVal">
                            <p class="clasificacion">
                                <span id="a${element.id}" class="promedio">${
              element.stars
            }</span>
                                <input type="radio" id="${cont}" name="estrellas">
                                <label onclick="puntuar(5,${
                                  element.id
                                })" for="${cont}" class="star"><i class="fa-regular fa-star"></i></label>
                                <input type="radio" id="${cont + 1}">
                                <label onclick="puntuar(4,${
                                  element.id
                                })" for="${
              cont + 1
            }"class="star"><i class="fa-regular fa-star"></i></label>
                                <input type="radio" id="${cont + 2}">
                                <label onclick="puntuar(3,${
                                  element.id
                                })" for="${
              cont + 2
            }"class="star"><i class="fa-regular fa-star"></i></label>
                                <input type="radio" id="${cont + 3}">
                                <label onclick="puntuar(2,${
                                  element.id
                                })" for="${
              cont + 3
            }"class="star"><i class="fa-regular fa-star"></i></label>
                                <input type="radio" id="${cont + 4}">
                                <label class="star" onclick="puntuar(1,${
                                  element.id
                                })" for="${
              cont + 4
            }"><i class="fa-regular fa-star"></i></label>
                            </p>
                        </form>
                    </div>   
                    <p>${element.description}</p>
                    <p>${element.tags}</p>
                    <div class="commentsContainer">
                        <h4>Comentarios</h4>
                        <div class="contInp">
                            <input type="text" placeholder="Escribe tu comentario" name="description" id="formCom${
                              element.id
                            }"> 
                            <button class="comentar btn btn-info" onclick="comentar(${
                              element.id
                            })">comentar</button>
                        </div>
                        <div id="comentarios${element.id}">

                        </div>
                    </div>
                    <hr>
                </div>
                `;

            tabla.innerHTML += tml;
            // if (likes[element.id] != undefined) {
            //   value = likes[element.id];
            //   switch (value) {
            //     case 1:
            //       document.getElementById(cont).checked = true;
            //       break;
            //     case 2:
            //       document.getElementById(cont + 1).checked = true;
            //       break;
            //     case 3:
            //       document.getElementById(cont + 2).checked = true;
            //       break;
            //     case 4:
            //       document.getElementById(cont + 3).checked = true;
            //       break;
            //     case 5:
            //       document.getElementById(cont + 4).checked = true;
            //       break;
            //   }
            // }
            cont += 10;
          });
        fetch(`http://localhost:8080/comment/${element.id}`, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            data.forEach((comentario) => {
              if (comentario.derecho) {
                document.getElementById(
                  `comentarios${element.id}`
                ).innerHTML += `
                <div class="comentario container"  id="${comentario.id}">
            <div class="row">
                <div class="col-md-4 contNombre">
                    <p>${comentario.username}</p>
                    <span onclick="eliminarComentario(${comentario.id})">X</span>
                  </div>
                  <hr>
                    <div class="col-md-6">
                    <p>${comentario.description}</p>
                    <p>${comentario.createdAt}</p>
                </div>
            </div>
        </div>
        `;
              } else {
                document.getElementById(
                  `comentarios${element.id}`
                ).innerHTML += `
                <div class="comentario container" id="${comentario.id}">
            <div class="row">
                <div class="col-md-4 contNombre">
                    <p>${comentario.username}</p>
                  </div>
                  <hr>
                    <div class="col-md-6">
                    <p>${comentario.description}</p>
                    <p>${comentario.createdAt}</p>
                </div>
            </div>
        </div>
        `;
              }
            });
          });
      });
    });
};

main();

const puntuar = (star, posteo) => {
  let data = { star, posteo };
  fetch("http://localhost:8080/stars", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: localStorage.getItem("Authorization"),
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      document.getElementById(`a${posteo}`).innerHTML = data.promedio;
    });
};

const comentar = (postId) => {
  const description = document.getElementById("formCom" + postId).value;
  socket.emit("comentar", {
    description,
    id: postId,
    token: localStorage.getItem("Authorization"),
  });
  //'comentarios' + postId
};

const conectarSocket = async () => {
  socket.on("connect", () => {
    console.log("socket online");
  });

  socket.on("comentario", (data) => {
    const { comment, username, imagen } = data;
    fetch(`http://localhost:8080/comment/${comment.id}/live`, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.derecho) {
          document.getElementById("comentarios" + imagen).innerHTML += `
              <div class="comentario container" id="${data.id}">
              <div class="row">
                  <div class="col-md-4 contNombre">
                      <p>${username}</p>
                      <span onclick="eliminarComentario(${data.id})">X</span>
                    </div>
                    <hr>
                      <div class="col-md-6">
                      <p>${data.description}</p>
                      <p>${data.createdAt}</p>
                  </div>
              </div>
          </div>
          `;
        } else {
          document.getElementById(`comentarios${imagen}`).innerHTML += `
              <div class="comentario container"  id="${data.id}">
          <div class="row">
              <div class="col-md-4 contNombre">
                  <p>${username}</p>
                </div>
                <hr>
                  <div class="col-md-6">
                  <p>${data.description}</p>
                  <p>${data.createdAt}</p>
              </div>
          </div>
      </div>
      `;
        }
      });
  });
};

function eliminarComentario(comentarioId) {
  console.log(comentarioId);
  fetch(`http://localhost:8080/comment/${comentarioId}`, {
    method: "DELETE",
  })
    .then((resp) => resp.json())
    .then((data) => {
      document.getElementById(`${comentarioId}`).outerHTML = "";
    });
}
