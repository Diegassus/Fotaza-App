require('dotenv').config();
const {Server} = require('./models');

const server = new Server();

server.listen();

//POSTEO
// despues revisar sistema de busqueda mediante categorias y etiquetado (x ahora cargar cualquier posteo)
// realizar las validaciones de la consigna
// arreglar la vista para que se destilden las entrellas e identificar si el usuario le dio like a un post y marcar esas estrellas

/*
Se necesita implementar una aplicación web que permita almacenar, ordenar, buscar, vender y
compartir fotografías en línea.

La comunidad se debe regir por normas de
comportamiento y condiciones de uso que favorezcan la buena gestión de los contenidos.

Funcionabilidades (Requerimientos mínimos):
1.- Sistema de autenticación de usuarios. (Listo)
2.- Gestor de contenidos (CRUD imágenes)
    2.1 Sistema de etiquetado de contenido
    2.2 Sistema de comentarios de contenido (CRUD comentarios)
3.- Motor de búsqueda de contenidos.

Los usuarios no autenticados solo podrán navegar y hacer uso del sistema de búsqueda de
fotografías para acceder a las imágenes publicadas como “públicas”.

Los usuarios autenticados podrán publicar imágenes, las cuales podrán ser publicadas como
públicas o protegidas. Las imágenes protegidas podrán solo ser accedidas por usuarios
autenticados.

La publicación de una imagen deberá tener una imagen (Obligatoria), un título (Obligatorio), una
categoría (Obligatoria), fecha de creación, formato, resolución, derechos de uso (Obligatorio) y
etiquetas (Máximo 3 etiquetas).

Se deberá realizar un relevamiento sobre los distintos tipos de derechos de autor. 

Las etiquetas son palabras claves que pueden agregarse a la publicación para favorecer la
búsqueda de las imágenes.

Los usuarios autenticados podrán realizar comentarios sobre las publicaciones. Es necesario
llevar registro sobre estos datos (fecha, usuario, descripción).

Cada publicación tendrá un sistema de valoración de 1 a 5 estrellas. Solo los usuarios
autenticados podrán valorar imágenes (máximo una 1 vez por imagen). La imagen debe siempre
presentar el valor promedio de las valoraciones recibidas.

Las fotos que tengan más de 50 valoraciones en la primera semana de publicación cuyo valor
promedio sea superior a 4 saldrán publicadas en la portada del sitio en un lugar destacado.
Las demás imágenes que figuren en la portada deberán seguir un criterio aleatorio que
comprenda no más de una imagen del mismo usuario y cuyas imágenes no sean más de 1 año
de antigüedad.

Todas las imágenes públicas accedidas por usuarios no autenticados deberán tener una marca
de agua con mención a Fotaza. Las imágenes privadas y con copyrigth deberán tener una marca
de agua cuyo texto o logo pueda ser configurado por el autor.

Toda imagen con copyrigth debe disponer de un mecanismo donde los interesados puedan
contactar y enviar un mensaje al autor respecto de su interés por adquirir la imagen.
*/