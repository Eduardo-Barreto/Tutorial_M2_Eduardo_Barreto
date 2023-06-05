const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'database.sqlite';

router.use(express.json());

router.get('/', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.all('SELECT * FROM education ORDER BY end_year DESC', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao buscar formação.' });
        } else {
            res.send(rows);
        }
    });
    db.close();
});

router.get('/:curriculum_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.all('SELECT * FROM education WHERE curriculum_id = ? ORDER BY end_year DESC', [req.params.curriculum_id], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao buscar formação.' });
        } else {
            res.send(rows);
        }
    });
    db.close();
});

router.post('/:curriculum_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    const { name, description, start_year, end_year } = req.body;
    db.run('INSERT INTO education (curriculum_id, name, description, start_year, end_year) VALUES (?, ?, ?, ?, ?)', [req.params.curriculum_id, name, description, start_year, end_year], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao inserir formação.' });
        } else {
            res.send({ message: 'Formação inserida com sucesso.' });
        }
    });
    db.close();
});

router.put('/:curriculum_id/:education_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    const { name, description, start_year, end_year } = req.body;
    db.run('UPDATE education SET name = coalesce(?, name), description = coalesce(?, description), start_year = coalesce(?, start_year), end_year = coalesce(?, end_year) WHERE education_id = ? AND curriculum_id = ?', [name, description, start_year, end_year, req.params.education_id, req.params.curriculum_id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao atualizar formação.' });
            return
        }

        res.send({ message: 'Formação atualizada com sucesso.' });

    });
    db.close();
});


router.delete('/:curriculum_id/:education_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.run('DELETE FROM education WHERE curriculum_id = ? AND education_id = ?', [req.params.curriculum_id, req.params.education_id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao excluir formação.' });
            return
        }
        res.send({ message: 'Formação excluída com sucesso.' });
    });
    db.close();
});

module.exports = router;
