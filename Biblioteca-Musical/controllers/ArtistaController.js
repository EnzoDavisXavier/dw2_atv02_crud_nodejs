import express from 'express' 
import artista from "../models/Artista.js";

const rota = express.Router();


rota.get("/artista", (req, res) =>{

    res.render('artista',{
        artistas:artista,
    });
});

rota.get("/artista/cadastrar", function (req, res) {
    res.render("artista-form", { artista: null });
});

rota.post("/artista/cadastrar", function (req, res) {
    artista.push({
        id: Date.now(),
        nome: req.body.nome,
        nacionalidade: req.body.nacionalidade,
        nascimento: req.body.nascimento
    });

    res.redirect("/artista");
});


rota.get("/artista/editar/:id", function (req, res) {
    const artistaEncontrado = artista.find(
        a => a.id == req.params.id
    );

    if (!artistaEncontrado) {
        return res.status(404).send("Artista não encontrado");
    }

    res.render("artista-form", {
        artista: artistaEncontrado
    });
});


rota.post("/artista/editar/:id", function (req, res) {
    const artistas = artista.find(a => a.id == req.params.id);

    if (!artistas) {
        return res.status(404).send("Artista não encontrado");
    }

    artistas.nome = req.body.nome;
    artistas.nacionalidade = req.body.nacionalidade;
    artistas.nascimento = req.body.nascimento;

    res.redirect("/artista");
});

rota.post("/artista/excluir/:id", function (req, res) {
    const indice = artista.findIndex(a => a.id == req.params.id);

    if (indice !== -1) {
        artista.splice(indice, 1);
    }

    res.redirect("/artista");
});

export default rota;