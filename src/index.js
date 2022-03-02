const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const {format} = require('timeago.js')//esto lo que hace es convertir fechas raras en tipo 'hace tanto tiempo'

//inicializando 
const app = express();
require('./database')//aquí importamos la base de datos y se realiza la conexión

//Settings
app.set('port', process.env.PORT || 4000);//aquí le decimos que si existe un puerto definido en las variables
//de entorno, entonces utilicelo, de lo contrario utilice el purto 4000
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));//este es una función que sirve para procesar, y el resultado es mostrarnos por consola
//las peticiones que hace el usuario
app.use(express.urlencoded({extended: false}));//esta función me ayuda a entender la información que me llega
//a través de los inputs de nuestros formularios, entenderla desde nuestro servidor, el extended: false
//significa que no vamos a enviar nada complicado, ya que las imagenes las vamos a procesar con multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/upload'),
    filename: (req,file,cb,filename) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase())
    }
})
app.use(multer({storage: storage}).single('image'));

//Variables globales
app.use((re,res,next) => {
    app.locals.format = format;
    next();
});

//Rutas
app.use(require('./routes/index'))

//Archivos estáticos o Static files
app.use(express.static(path.join(__dirname, 'public')));//con este código hacemos pública la carpeta public

//Start the Server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});