const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-bank', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
    console.log('Conexão com MongoDB realizada com sucesso!');
    
}).catch((erro) => {
    console.log('Erro: Conexão com MongoDB não foi realizada com sucesso!');
});

mongoose.Promise = global.Promise;

module.exports = mongoose;