import express from 'express' 
import album from "../models/Album.js";

const rota = express.Router();


rota.get("/album", (req, res)=>{

        res.render("album",{
            album: album,
        })
})

rota.get("/album/cadastrar", function (req, res) {
    res.render("album-form", { album: null });
    album: null
});

rota.post("/album/cadastrar", function (req, res) {
    const novoAlbum = {
        id: Date.now(),
        titulo: req.body.titulo,
        artista: req.body.artista,
        ano: Number(req.body.ano)
    };

    album.push(novoAlbum);

    res.redirect("/album");
});
rota.get("/album/editar/:id", function (req, res) {
    const albums = album.find(a => a.id == req.params.id);

    if (!albums) {
        return res.status(404).send("Álbum não encontrado");
    }

    res.render("album-form", { album: albums });
});

rota.post("/album/editar/:id", function (req, res) {
    const albums = album.find(a => a.id == req.params.id);

    if (!albums) {
        return res.status(404).send("Álbum não encontrado");
    }

    albums.titulo = req.body.titulo;
    albums.artista = req.body.artista;
    albums.ano = Number(req.body.ano);

    res.redirect("/album");
});

rota.post("/album/excluir/:id", function (req, res) {
    const indice = album.findIndex(a => a.id == req.params.id);

    if (indice !== -1) {
        album.splice(indice, 1);
    }

    res.redirect("/album");
});

export default rota;