const $bell = document.getElementById("notification");
// no debe ser un event listener sino el metodo del socket para actualizar y un fetch (primero) para ver si no hay pendientes

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
console.log(contactos, imagen);

setTimeout(() => {
  fetch('http://localhost:8080/notification',{
  headers: {
    Authorization: localStorage.getItem("Authorization")
  }
}).then(resp => resp.json()).then(({notificaciones,imagenes}) => {
  if(imagenes.length>0){
    $bell.setAttribute('data-count', imagenes.length);
    $bell.classList.add('show-count');
    $bell.classList.add('notify');
    notificaciones.forEach(element => {
      contactos.push(element)
    })
    imagenes.forEach(element => {
      imagen.push(element)
    })
  }
})
},2*60*1000)

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