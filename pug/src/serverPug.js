import express,{ Router } from 'express'
import { Productos } from './Api.js'

const app = express();
const port = 8080;
const routerProductos = Router();
const productNotFound = 'Producto no encontrado';
const apiProductos = new Productos();


app.set("view engine", "pug");
app.set("views", "../views");
app.use(express.static('../public'));


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/productos', routerProductos);

app.get("/", (req, res) => {
    res.render('form.pug');
});





routerProductos.get("/", (req, res) => {
    const response = apiProductos.getAll();
  
    if (!response) res.send({ error: productNotFound });
  
    res.render('productos.pug', { productos: response });
});
  
routerProductos.post("/", (req, res) => {
    const { title, price, thumbnail } = req.body;
  
    apiProductos.save({ title, price, thumbnail });
  
    res.redirect("/");
});


const server = app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
}); 
server.on('error', error => console.log(`Error en servidor ${error}`))



// toTestProductos   = 
//     {
//         title:"iPhoneX",
//         price : 1500,
//         thumbnail: "https://cdn4.iconfinder.com/data/icons/apple-products-2026/512/iPhone_X_home-screen-512.png",
//     },
//     {
//         title:"iMac",
//         price : 6500,
//         thumbnail: "https://cdn4.iconfinder.com/data/icons/apple-products-2026/512/iMac-512.png",
//     },
//     {
//         title:"Apple TV",
//         price : 800,
//         thumbnail: "https://cdn1.iconfinder.com/data/icons/apple-products-2026/512/Apple_TV__Ovladac-512.png",
//     },
//     {
//         title:"Ipad",
//         price : 1700,
//         thumbnail: "https://cdn4.iconfinder.com/data/icons/apple-products-2026/512/iPad_White_Front-512.png",
//     }
