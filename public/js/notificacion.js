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

$bell.addEventListener("click", () => {
  console.log('hola')
})