const express = require('express');
const mime = require('mime-types');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const sequelize = require('../db/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080 ;
        this.paths = {
            user:'/user',
            auth:'/auth',
            profile:'/profile',
            image:'/image',
            upload:'/uploads',
            category:'/category',
            rights:'/rights',
            stars:'/stars'
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
        this.app.use(express.static('public',{
            setHeaders: (res,path)=>{
                const contentType = mime.lookup(path);
                if(contentType){
                    res.setHeader('Content-Type',contentType);
                }
            }
        }));
        this.app.use(cors());
        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir:'/tmp/'
        }))
    }

    routes(){
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.profile,require('../routes/profile'));
        this.app.use(this.paths.image,require('../routes/image'));
        this.app.use(this.paths.upload,require('../routes/uploads'));
        this.app.use(this.paths.category,require('../routes/category'));
        this.app.use(this.paths.rights,require('../routes/rights'));
        this.app.use(this.paths.stars,require('../routes/stars.js'));
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