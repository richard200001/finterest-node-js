const {Schema, model, now} = require('mongoose');
//tener en cuenta que aquí no se guarda la imagen como tal, solamente se guardan los datos de la imagen
//aquí creamos el esquema de la base de datos
const imageSchema = new Schema({
    title: { type: String},
    description: { type: String},
    filename: { type: String},
    path: { type: String},
    originalname: { type: String},
    mimetype: { type: String},
    size: { type: Number},
    created_at: {type: Date, default: Date.now()}//aquí le decimos que si no le mandamos fecha que coloque la 
    //fecha actual por default
});
//aquí empezamos a utilizar el esquema de la base de datos
module.exports = model('Image', imageSchema);//el primer parámetro es el nombre del esquema, el segundo
//es la constante del esquema de la base de datos