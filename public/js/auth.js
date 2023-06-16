const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click',()=>{
  container.classList.add('right-panel-active');
});

signInButton.addEventListener('click',()=>{
  container.classList.remove('right-panel-active');
});


/// logica formularios ... no se como pero funciona el login
const url = (window.location.hostname.includes('localhost'))
                   ? 'http://localhost:8080/auth/'
                   : 'https://restserverbasico.up.railway.app/auth/'

const urlCreate = 'http://localhost:8080/user'

const formLogin = document.getElementById('login');
const formSignin = document.getElementById('create-account');

formLogin.addEventListener('submit',(e)=>{
  e.preventDefault();
  const formData = {}
  for(let el of formLogin.elements ){
      if(el.name.length > 0){
          formData[el.name] = el.value 
      }
  }
  //console.log(formData)
  fetch('http://localhost:8080/auth/login',{
      method:'POST',
      body:JSON.stringify(formData),
      headers:{
          'Content-Type':'application/json'
      }
  }).then(res => res.json()).then(({msg,token})=>{
      if(msg){
          return console.error(msg);
      }
      localStorage.setItem('Authorization' , token);
      window.location.href = "http://localhost:8080/"
  }).catch(e=>{
      console.log(e);
  })
})


// desarrollar logica para crear una cuenta nueva
formSignin.addEventListener('submit',e=>{
  e.preventDefault();
  const formData = {}
  for(let el of formSignin.elements ){
      if(el.name.length > 0){
          formData[el.name] = el.value 
      }
  }
  fetch('http://localhost:8080/user',{
    method:'POST',
    body:JSON.stringify(formData),
    headers:{
        'Content-Type':'application/json'
    }
}).then(res => res.json()).then(({msg})=>{
    if(msg.includes('existe')) return
    fetch(url + 'login',{
        method:'POST',
        body:JSON.stringify(formData),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res => res.json()).then(({msg,token})=>{
        if(msg){
            return console.error(msg);
        }
        localStorage.setItem('Authorization' , token);
        window.location.href = "http://localhost:8080/"
    }).catch(e=>{
        console.log(e);
    })
}).catch(e=>{
    console.log(e);
})
})