require('dotenv').config();
const {Server} = require('./models');

const server = new Server();

server.listen();  // Revisar TODAS las rutas y contemplar donde puede tirar un error (Tambien validar los datos que deben llegar con el check de express.validator). Crear vistas para los errores o devolver json con un mensaje y mostrarlo en la vista correspondiente del fetch con un catch

/**
 * 
 * Validaciones

La publicación de una imagen deberá tener una imagen (Obligatoria), un título (Obligatorio), una
categoría (Obligatoria), fecha de creación, formato, resolución, derechos de uso (Obligatorio) y
etiquetas (Máximo 3 etiquetas).

Toda imagen con copyrigth debe disponer de un mecanismo donde los interesados puedan
contactar y enviar un mensaje al autor respecto de su interés por adquirir la imagen.

Toda imagen con copyright debe ser privada
 */

//POSTEO
// arreglar la vista para que se destilden las entrellas y marcar las estrellas dadas por el usuario cuando se carga el post

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

La publicación de una imagen deberá tener una imagen (Obligatoria), un título (Obligatorio), una
categoría (Obligatoria), fecha de creación, formato, resolución, derechos de uso (Obligatorio) y
etiquetas (Máximo 3 etiquetas).

Los usuarios autenticados podrán realizar comentarios sobre las publicaciones. Es necesario
llevar registro sobre estos datos (fecha, usuario, descripción).

Las fotos que tengan más de 50 valoraciones en la primera semana de publicación cuyo valor
promedio sea superior a 4 saldrán publicadas en la portada del sitio en un lugar destacado.
Las demás imágenes que figuren en la portada deberán seguir un criterio aleatorio que
comprenda no más de una imagen del mismo usuario y cuyas imágenes no sean más de 1 año
de antigüedad.

Todas las imágenes públicas accedidas por usuarios no autenticados deberán tener una marca
de agua con mención a Fotaza. Las imágenes privadas y con copyrigth deberán tener una marca
de agua cuyo texto o logo pueda ser configurado por el autor. (Consultar si aquellas sin derechos deben o no llevar watermark)

Toda imagen con copyrigth debe disponer de un mecanismo donde los interesados puedan
contactar y enviar un mensaje al autor respecto de su interés por adquirir la imagen.


Realizar en el sistema para subir imagenes, uno para eliminar la anterior y de tal manera borrar basura
*/