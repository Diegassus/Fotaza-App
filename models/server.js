const express = require('express');
const cors = require('cors');
const sequelize = require('../db/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080 ;
        this.paths = {
            user:'/user',
            auth:'/auth'
        } 

        // conectar a la base de datos con sequelize
        this.connectDB();
        
        // llamado a los middlewares
        this.middlewares();

        // manejo de plantillas pug
        this.views();

        // enrutamiento
        this.routes();
    }

    views(){
        this.app.set('views');
        this.app.set('view engine','pug');
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(cors());
    }

    routes(){
         // crear un controlador que me permita obtener del token enviado po el auth, el usuario y mandarlo a renderizar en la vista del index
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.auth, require('../routes/auth'));
    }

    async connectDB(){
        try {
            await sequelize.authenticate();
            console.log('Conexion exitosa con la base de datos');
        } catch (error) {
            console.log('Ocurrio un problema para conectarse a la base de datos:',error);
        }
    }

    listen(){
        this.app.listen(this.port , () => console.log('Servidor corriendo en el puerto', this.port) );
    }
}


module.exports = Server ;