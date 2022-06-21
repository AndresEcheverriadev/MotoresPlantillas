import express, { json } from 'express'

const app = express();
const router = express.Router();
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
}); 

const productos = [
    {
        title:"iPhoneX",
        price : 1500,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/apple-products-2026/512/iPhone_X_home-screen-512.png",
        id: 1
    },
    {
        title:"iMac",
        price : 6500,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/apple-products-2026/512/iMac-512.png",
        id: 2
    },
    {
        title:"Apple TV",
        price : 800,
        thumbnail: "https://cdn1.iconfinder.com/data/icons/apple-products-2026/512/Apple_TV__Ovladac-512.png",
        id: 3
    },
    {
        title:"Ipad",
        price : 1700,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/apple-products-2026/512/iPad_White_Front-512.png",
        id: 4
    }
];

app.use('/api/productos',router);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
router.use(express.json());
router.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

router.get('', (req,res) => {
    if(productos.length == 0){
        res.json('No hay productos');
    }else {
        res.json(productos);
    };
}
); 

router.get('/:id', (req,res) => {
    const productofiltrado = productos.filter(prod => JSON.stringify(prod.id) === req.params.id);
    if(productofiltrado.length == 0) {
        res.json('Producto no existe');
    }
    else {
        res.json(productofiltrado);
    };
}
); 

router.post('/guardar', (req,res) => {
    let newID = productos.length+1;
    productos.push({title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        id: newID});
    res.json({result: "Producto guardado:",title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        id: newID});
}
);

router.put('/editar/:id', (req,res) => {
    productos[(req.params.id)-1].title = req.body.title;
    productos[(req.params.id)-1].price = req.body.price;
    productos[(req.params.id)-1].thumbnail = req.body.thumbnail;
    res.json({result: "Producto editado:",title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    id:  JSON.parse(req.params.id)});
}
);

router.delete('/borrar/:id', (req,res) => {
    productos.splice(req.params.id-1,1); 
    res.json({result: "Producto borrado:",title: productos.title,
    price: productos.price,
    thumbnail: productos.thumbnail,
    id:  JSON.parse(req.params.id)});
}
); 

const nuevo = {
    "title":'iPod Shuffle',
    "price" : 500,
    "thumbnail": 'https://www.iconfinder.com/icons/2041366/apple_ipod_mp3_music_shuffle_icon',
    "id": 2
};