import express from 'express'

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
        id: "2"
    },
    {
        title:"Apple TV",
        price : 800,
        thumbnail: "https://cdn1.iconfinder.com/data/icons/apple-products-2026/512/Apple_TV__Ovladac-512.png",
        id: "3"
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
    res.json(productos);
}
); 

router.get('/:id', (req,res) => {
    const productofiltrado = productos.filter(prod => prod.id === req.params.id);
    res.json(productofiltrado);
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
    let productofiltrado = productos.filter(prod => prod.id === req.params.id);
    
    res.json({result:'ok',
            id: req.params.id,
            nuevo: req.body});
}
); 

// const nuevo = {
//     title:'iPod Shuffle',
//     price : 500,
//     thumbnail: 'https://www.iconfinder.com/icons/2041366/apple_ipod_mp3_music_shuffle_icon',
//     id: newID
// };