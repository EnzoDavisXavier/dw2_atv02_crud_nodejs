import express from 'express';

const app = express(); 


import ArtistaController from "./controllers/ArtistaController.js";
import GeneroController from "./controllers/GeneroController.js";
import AlbumController from "./controllers/AlbumController.js";

app.set('view engine', 'ejs'); 

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(ArtistaController);
app.use(AlbumController);
app.use(GeneroController);

app.get("/", (req,res) => {
    res.render('index');

});

const port = 8080;
app.listen(port, (error) => {

    if(error){
        console.log(`Ocorreu um erro ao iniciar o servidor. Erro ${error}`);
    }
    else{

        console.log(`Servidor iniciado com sucesso em: http://localhost:${port}`);
    }
});