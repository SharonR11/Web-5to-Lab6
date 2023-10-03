const app = require('./app');
const port = 3000;
require('./database');

async function init(){
    await app.listen(port);
    console.log(`Servidor en el puerto ${port} ....!!!`);
}
//cada vez que se dispere el servicio va a esperar a que se ejecute
init();