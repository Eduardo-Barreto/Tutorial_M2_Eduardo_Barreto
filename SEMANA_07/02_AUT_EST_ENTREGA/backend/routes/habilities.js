const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'database.sqlite';

router.use(express.json());

router.get('/', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.all('SELECT * FROM habilities ORDER BY level DESC', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao buscar habilidades.' });
        } else {
            res.send(rows);
        }
    });
    db.close();
});

router.get('/:curriculum_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.all('SELECT * FROM habilities WHERE curriculum_id = ? ORDER BY level DESC', [req.params.curriculum_id], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao buscar habilidades.' });
        } else {
            res.send(rows);
        }
    });
    db.close();
});

router.post('/:curriculum_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    const { name, level } = req.body;
    db.run('INSERT INTO habilities (curriculum_id, name, level) VALUES (?, ?, ?)', [req.params.curriculum_id, name, level], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao inserir habilidade.' });
        } else {
            res.send({ message: 'Habilidade inserida com sucesso.' });
        }
    });
    db.close();
});

router.put('/:curriculum_id/:hability_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    const { name, level } = req.body;
    db.run('UPDATE habilities SET name = coalesce(?, name), level = coalesce(?, level) WHERE hability_id = ? AND curriculum_id = ?', [name, level, req.params.hability_id, req.params.curriculum_id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao atualizar habilidade.' });
            return
        }

        res.send({ message: 'Habilidade atualizada com sucesso.' });

    });
    db.close();
});


router.delete('/:curriculum_id/:hability_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.run('DELETE FROM habilities WHERE curriculum_id = ? AND hability_id = ?', [req.params.curriculum_id, req.params.hability_id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao excluir habilidade.' });
            return
        }
        res.send({ message: 'Habilidade excluída com sucesso.' });
    });
    db.close();
});

module.exports = router;
