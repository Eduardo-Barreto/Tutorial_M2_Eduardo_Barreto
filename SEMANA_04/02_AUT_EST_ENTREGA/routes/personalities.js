const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'database.sqlite';

router.use(express.json());

router.get('/', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.all('SELECT * FROM personalities ORDER BY level DESC', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao buscar personalidades.' });
        } else {
            res.send(rows);
        }
    });
    db.close();
});

router.get('/:curriculum_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.all('SELECT * FROM personalities WHERE curriculum_id = ? ORDER BY level DESC', [req.params.curriculum_id], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao buscar personalidades.' });
        } else {
            res.send(rows);
        }
    });
    db.close();
});

router.post('/:curriculum_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    const { name, level } = req.body;
    db.run('INSERT INTO personalities (curriculum_id, name, level) VALUES (?, ?, ?)', [req.params.curriculum_id, name, level], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao inserir personalidade.' });
        } else {
            res.send({ message: 'Personalidade inserida com sucesso.' });
        }
    });
    db.close();
});

router.put('/:curriculum_id/:personality_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    const { name, level } = req.body;
    db.run('UPDATE personalities SET name = coalesce(?, name), level = coalesce(?, level) WHERE personality_id = ? AND curriculum_id = ?', [name, level, req.params.personality_id, req.params.curriculum_id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao atualizar personalidade.' });
            return
        }

        res.send({ message: 'Personalidade atualizada com sucesso.' });

    });
    db.close();
});


router.delete('/:curriculum_id/:personality_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.run('DELETE FROM personalities WHERE curriculum_id = ? AND personality_id = ?', [req.params.curriculum_id, req.params.personality_id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao excluir personalidade.' });
            return
        }
        res.send({ message: 'Personalidade excluída com sucesso.' });
    });
    db.close();
});

module.exports = router;
