const express = require('express');
const { Router } = express 
const app = express();
const router = express.Router();
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});

app.use('/api/productos',router);
router.use(express.json());

const productos = [{nombre:'producto1',id : '1'},{nombre:'producto2',id : '2'},{nombre:'producto3',id : '3'}];

router.get('', (req,res) => {
    res.json(productos);
}
); 

router.get('/:id', (req,res) => {
    const productofiltrado = productos.filter(prod => prod.id === req.params.id);
    res.json(productofiltrado);
}
); 

router.post('', (req,res) => {
    const nuevo = {nombre:'producto4',id : '4'};
    productos.push(nuevo);
    res.json(productos);
}
);





