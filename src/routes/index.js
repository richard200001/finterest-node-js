const {Router} = require('express');
//const image = require('../models/Image');
const router = Router();
const path = require('path');
const { unlink } = require('fs-extra');//con unlink podemos eliminar la imagen de views

const Image = require('../models/Image');//esta importación permite crear objetos para guardrlos en la base
//de datos

router.get('/', async (req, res) => {
   // res.send('index page');//direccionamos a la pagina de inicio
  const images = await Image.find();
  console.log(images);
  res.render('index', {images});//primer parámetro es la vista de views/index.ejs, segundo parámetro es el json
  //es decir los datos de la imágen
});

router.get('/upload', (req, res) => {
    res.render('upload');//render nos pinta las gráficas, lo dirccionamos con /upload, que es la vista
});

router.post('/upload', async (req, res) => {//aquí es cuando ya se ha subido la imágen, direccionamos a la pagina
    //de subido
    const image= new Image();//creamos el objeto image que es de la base de datos
    image.title = req.body.title;//utilizamos el objeto guardando estos datos
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/upload/' + req.file.filename;//aquí guardamos la ruta donde se encuentra la imagen
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    //console.log(req.file);
    console.log(image);
    await image.save();//aquí guardo los datos obtenidos
    //res.send('uploaded');//aquí redirecciono a una ágina que diga subido
    res.redirect('/');//aquí lo redirecciono a la pestaña de inicio
});

router.get('/image/:id', async (req, res) => {//aquí podemos ver la imagen
    const {id} = req.params;//obtengo el id de la imagen seleccionada
    const image = await Image.findById(id);//lo busco en la base de datos
    console.log(image);
    res.render('profile', {image});//primer parámetro es la página, el segundo son los datos de la imágen
});

router.get('/image/:id/delete', async (req, res) => {//aquí direcciona cuando hemos eliminado una imagen
    const { id } = req.params;
   const image = await Image.findByIdAndDelete(id);//eliminamos de la base de datos los datos de la imagen
   await unlink(path.resolve('./src/public' + image.path));//aquí indicamos la ruta de la imagen que queremos eliminar
   //y se elimina
    res.redirect('/');
});

module.exports = router;