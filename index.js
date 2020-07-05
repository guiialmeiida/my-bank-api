const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/controllers/depositoController')(app);
require('./src/controllers/saqueController')(app);
require('./src/controllers/consultaSaldoController')(app);
require('./src/controllers/deletarContaController')(app);
require('./src/controllers/transferenciaController')(app);
require('./src/controllers/mediaController')(app);

app.listen(process.env.PORT || 3000, () =>{
    console.log('Servidor iniciado na porta 3000: http://localhost:3000/');
});