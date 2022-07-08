import express from 'express'
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { Mesagges } from './MesaggesSystem.js'
import { Productos } from './Filesystem.js'

const apiMensajes = new Mesagges();
const apiProductos = new Productos('products');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const port = 8080;
app.use(express.static('public'));

const getTimestamp = () => {
    const date = new Date();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};


io.on('connection', async (socket)=> {
    console.log(`Cliente conectado en ${socket.id}`);
    socket.emit("mensajes", apiMensajes.getAll());

    socket.on("mensajeNuevo", ({ email, text }) => {
        const message = { email, text, timestamp:getTimestamp() };
        apiMensajes.save(message);

    io.sockets.emit("mensajes", apiMensajes.getAll());
});

socket.emit("products", await apiProductos.getAll());

  socket.on("add-product", async (data) => {
    const products = await apiProductos.save(data);

    io.sockets.emit("products", products);
  });

});

const server = httpServer.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
});

server.on("error", (error) => {
    console.error(`Error en el servidor ${error}`);
});













// app.use(express.json());
// app.use(express.urlencoded({extended: true}))

// app.get("/", (req, res) => {
//     res.render('./form');
//     const response = apiProductos.getAll();
  
//     if (!response) res.send({ error: productNotFound });
  
//     res.render("productos", { productos: response });
// });








