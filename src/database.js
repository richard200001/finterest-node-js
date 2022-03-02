const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{//en el primer parámetro colocamos 
 //'mongodb://localhost/aquíelnombredelabasededatos
    useNewUrlParser: true//este segundo parámetro es para que no nos de problemas la conexión
})
  .then(db => console.log('DB is connected'))//si conectó correctamente va a mandar por consola 'DB is connected'
  .catch(err => console.error(err));//si hubo error al conectar mandará el error por la consola