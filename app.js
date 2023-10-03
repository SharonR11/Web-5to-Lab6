
const express = require('express');//llamada de express
const jwt = require("jsonwebtoken");//Invoca a la libreria de jwt
const config = require('./public/scripts/config');

const app = express();//inicializa la constante express
app.use(express.json());
app.use(express.urlencoded({extended: false}));//directiva para usar o no json

app.all('/user',(req, res, next) => {// cuando sea user va a poder ingresar
    console.log('Por aqui pasamos');
    next();
});


//********User*********// primer empoit // tipo get
app.get('/', (req, res) => {// AL LLAMADO DEL DOMINIIO SE INVOCA ESTA SECCION 
    res.sendFile(__dirname + '/public/login.html');//este empoit llama al archivo login.html
});
app.get('/index2', (req, res) => {// AL LLAMADO DEL DOMINIIO SE INVOCA ESTA SECCION 
    res.sendFile(__dirname + '/public/index.html');//este empoit llama al archivo login.html
});


app.get('/register', (req, res) => {//empoit llamado register
    res.sendFile(__dirname + '/public/register.html');
});

app.post('/sinup', (req, res) => {//posteos

    console.log(`Post pagina de login ${req.body.username} `);//saca e imprime el username
    console.log(`Post pagina de login ${req.body.password} `);//
    
    if(`${req.body.username}` === 'Deysi Lloja' //lo que venga en el username debe ser identicamente igual a juam perex
           && `${req.body.password}` === '123'){//debe ser identicamente igual a 29
            console.log('Nombre: ' + `${req.body.username}` + ', Password: ' + `${req.body.password}`);//muestra en consola
            const user = {//creamos una constante de tipo json
                nombre : `${req.body.username}`,
                password: `${req.body.password}`
            }
            //utilización de la libreria de JWT,  saing crea un tocken. 
            jwt.sign({user: user}, 'secretkey'/*encriptaci´ón*/, {expiresIn:'32s'} /*se establece el tiempo de vida*/, (err, token)/*para verificar el error*/ => {
                res.json({token: token});//crea al response un json, con el valor del json creado, y devuelve al navedaor-- se imprime el tocken creado
                //res.sendFile(__dirname + '/public/index.html');
            });
            window.location.href = '/index.html'
    }
    else{//si la validación no sucede.. imprime error
            return res.status(401).json({//retorna un status de erroe
                auth: false,
                message: 'No token provided'//devolvera en el json.. no hay token :xd
            });
    }
    
});
//unidervol es un metodo que esta llamada en intermedio-- se ejecuta cuando termina el miderwol.. se ejecutan las demas sentencias
app.post('/sinin', verifyToken, (req, res) => {//el logueo uuwuw 
//creación de un usario.. insertamos en la base de daton
     jwt.verify(req.token, 'secretkey', (err, authData) => {//verifica si contiene o no contiene un tocken valido uwu
        if(err){
            res.sendStatus(403);//en caso de que no sea valido imprime ell status 
            res.sendFile(__dirname + '/public/error.html');
        }else {
            console.log('Token verificado con éxito');
            res.json({
                mensaje: "Post fue Creado",
                authData: authData
            });
            res.sendFile(__dirname + '/index2');
        }
        
    });

});

// Authorization: Bearer <token>
function verifyToken(req, res, next){//
    //valida si el token es real o bama.. el heder llama a la palabra reservada a autorización
    const bearerHeader = req.headers['authorization'];//define una constante llamada bodyHeader
    if(typeof bearerHeader !== 'undefined'){// si esta definido ejecuta la sentencia. en caso de que no envia un status 440
        bearerToken = bearerHeader.split(" ")[1];//se ejecuta un split //psoisición 1 el token uwuw
        req.token = bearerToken;
        next();//se debe deponer next.. hace que regrese a continuar la ejecución de las demas sentencias
    }
    else{
        res.status(401);
        //res.sendFile(__dirname + '/public/error.html');
    }
}

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000,  http://localhost:3000/')
})