import express from 'express' 
import genero from "../models/Genero.js";

const rota = express.Router();

rota.get("/genero", (req, res)=>{
    
    res.render('genero',{
        genero:genero,
    });
})

rota.get("/genero/cadastrar", function (req, res) {
    res.render("genero-form", { genero: null });
});

rota.post("/genero/cadastrar", function (req, res) {
    genero.push({
        id: Date.now(),
        nome: req.body.nome,
        descricao: req.body.descricao
    });

    res.redirect("/genero");
});

rota.get("/genero/editar/:id", function (req, res) {
    const generos = genero.find(g => g.id == req.params.id);

    if (!generos) {
        return res.status(404).send("Gênero não encontrado");
    }

    res.render("genero-form", { genero: generos });
});

rota.post("/genero/editar/:id", function (req, res) {
    const generos = genero.find(g => g.id == req.params.id);

    if (!generos) {
        return res.status(404).send("Gênero não encontrado");
    }

    generos.nome = req.body.nome;
    generos.descricao = req.body.descricao;

    res.redirect("/genero");
});

rota.post("/genero/excluir/:id", function (req, res) {
    const indice = genero.findIndex(g => g.id == req.params.id);

    if (indice !== -1) {
        genero.splice(indice, 1);
    }

    res.redirect("/genero");
});

export default rota;