fetch('http://localhost:8080/image/portada').then(res => res.json()).then(({images}) => {
    const galeria = document.getElementById('galeria');
    const options = {
        init(img) {
          img.crossOrigin = "anonymous";
        },
      };
    images.forEach((element)=>{
        watermark(
            [`http://localhost:8080/uploads/image/${element.src}`],
            options
        ).image(
            watermark.text.lowerRight(`${element.watermartk}`, "#ffffff", 0.5)
        ).then(function (img) {
            tml = `
                <a href="http://localhost:8080/profile/${element.UserId}">
                    <div class="pic">
                        <img src="${img.src}" class="w-100 h-auto">
                    </div>
                </a>
            `
            galeria.innerHTML += tml;
        });
    })
}).catch(e=>{
    console.log(e);
});

