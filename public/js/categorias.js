const catDiv = document.getElementById('categorias');

fetch('http://localhost:8080/category').then(response => response.json()).then(data => {
    const {msg,categories} = data;
    let html = '';
    if(msg == 1){
        categories.forEach(element => {
            html += `
            <li class="nav-item">
                <button class="btn cat">${element.name}</button>
            </li>`
        });
        catDiv.innerHTML = html;
    }

    document.querySelectorAll('.cat').forEach(element => {
        element.addEventListener('click', () => {
            fetch(`http://localhost:8080/image/cat/${element.innerHTML}`,{
                headers:{
                    Authorization: localStorage.getItem('Authorization')
                }
            }).then(response => response.json()).then(data => {
                const {response,likes} = data;
        const tabla = document.getElementById('load');
        tabla.innerHTML=''
        let tml;
        let cont = 1;
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
            })
        });
    });
})

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

