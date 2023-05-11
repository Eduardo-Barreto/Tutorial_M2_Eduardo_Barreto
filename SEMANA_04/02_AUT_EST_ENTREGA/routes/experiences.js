const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'database.sqlite';

router.use(express.json());

router.get('/', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.all('SELECT * FROM experiences ORDER BY end_year DESC', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao buscar experiências.' });
        } else {
            res.send(rows);
        }
    });
    db.close();
});

router.get('/:curriculum_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.all('SELECT * FROM experiences WHERE curriculum_id = ? ORDER BY end_year DESC', [req.params.curriculum_id], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao buscar experiências.' });
        } else {
            res.send(rows);
        }
    });
    db.close();
});

router.post('/:curriculum_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    const { company_name, role, description, start_year, end_year } = req.body;
    db.run('INSERT INTO experiences (curriculum_id, company_name, role, description, start_year, end_year) VALUES (?, ?, ?, ?, ?, ?)', [req.params.curriculum_id, company_name, role, description, start_year, end_year], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao inserir experiência.' });
        } else {
            res.send({ message: 'Experiência inserida com sucesso.' });
        }
    });
    db.close();
});

router.put('/:curriculum_id/:experience_id', (req, res) => {
    const { company_name, role, description, start_year, end_year } = req.body;
    var db = new sqlite3.Database(DBPATH);
    db.run('UPDATE experiences SET company_name = coalesce(?, company_name), role = coalesce(?, role), description = coalesce(?, description), start_year = coalesce(?, start_year), end_year = coalesce(?, end_year) WHERE experience_id = ?', [company_name, role, description, start_year, end_year, req.params.experience_id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao atualizar experiência.' });
            return
        }

        res.send({ message: 'Experiência atualizada com sucesso.' });

    });
    db.close();
});


router.delete('/:curriculum_id/:experience_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.run('DELETE FROM experiences WHERE curriculum_id = ? AND experience_id = ?', [req.params.curriculum_id, req.params.experience_id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao excluir experiência.' });
            return
        }
        res.send({ message: 'Experiência excluída com sucesso.' });
    });
    db.close();
});

module.exports = router;
