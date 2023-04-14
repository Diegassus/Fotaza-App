const jwt = require('jsonwebtoken');

const generateJWT = ( id = '' ) => {
    return new Promise((res,rej)=>{
        const payload = {id};

        jwt.sign(payload,process.env.SECRET,{
            expiresIn:'12h'
        },(err,token)=>{
            if(err){
                console.log(e);
                rej('No se pudo generar el token');
            }else{
                res(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}