const catDiv = document.getElementById('categorias');
const derDiv = document.getElementById('derechos');

fetch('http://localhost:8080/rights').then(response => response.json()).then(data => {
    const {rights} = data;
    let html = '';
    rights.forEach(element => {
        html += `<option value="${element.id}">${element.name}</option>`
    });
    derDiv.innerHTML = html;
})

fetch('http://localhost:8080/category').then(response => response.json()).then(data => {
    const {msg,categories} = data;
    let html = '';
    if(msg == 1){
        categories.forEach(element => {
            html += `<option value="${element.id}">${element.name}</option>`
        });
        catDiv.innerHTML = html;
    }
})




// MANEJO DE ETIQUETAS 

const MAX_TAGS = 3;
const tagInput = document.getElementById('tag-input');
const addTag = document.getElementById('mas');
const mostrarTags = document.getElementById("tags");
let cont = 1;

addTag.addEventListener('click', () => {
    const tag = tagInput.value.trim();
    if(tag.length > 0 && cont < 4){
        cont++;
        mostrarTags.value += `#${tag}` ;
        tagInput.value = '';
    }
})

// preview

const file = document.getElementById('src');
const preview = document.getElementById('preview');

file.addEventListener('change', () => {
    const reader = new FileReader();
    reader.onload = () => {
        preview.src = reader.result;
    }

    if(file.files[0]){
        reader.readAsDataURL(file.files[0]);
    }else{
        preview.src = '';
    }
})