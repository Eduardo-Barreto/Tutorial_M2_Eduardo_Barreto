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
    db.run('INSERT INTO habilities (curriculum_id, name, level) VALUES (?, ?, ?, ?)', [req.params.curriculum_id, name, level], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao inserir realização.' });
        } else {
            res.send({ message: 'Realização inserida com sucesso.' });
        }
    });
    db.close();
});

router.put('/:curriculum_id/:realization_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    const { name, level } = req.body;
    db.run('UPDATE habilities SET name = coalesce(?, name), description = coalesce(?, description), year = coalesce(?, year) WHERE realization_id = ? AND curriculum_id = ?', [name, level, req.params.realization_id, req.params.curriculum_id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao atualizar realização.' });
            return
        }

        res.send({ message: 'Realização atualizada com sucesso.' });

    });
    db.close();
});


router.delete('/:curriculum_id/:realization_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.run('DELETE FROM habilities WHERE curriculum_id = ? AND realization_id = ?', [req.params.curriculum_id, req.params.realization_id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao excluir realização.' });
            return
        }
        res.send({ message: 'Realização excluída com sucesso.' });
    });
    db.close();
});

module.exports = router;
