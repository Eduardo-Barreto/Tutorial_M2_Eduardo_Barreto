const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'database.sqlite';

router.use(express.json());

router.get('/', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.all('SELECT * FROM curriculum', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao buscar currículo.' });
        } else {
            res.send(rows);
        }
    });
    db.close();
});

router.get('/:curriculum_id', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.all('SELECT * FROM curriculum WHERE curriculum_id = ?', [req.params.curriculum_id], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao buscar currículo.' });
        } else {
            res.send(rows);
        }
    });
    db.close();
});

router.post('/', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    const {
        first_name,
        last_name,
        role,
        picture_URL,
        address,
        phone_number,
        email,
        description
    } = req.body;
    db.run('INSERT INTO curriculum (curriculum_id, first_name, last_name, role, picture_URL, address, phone_number, email, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.params.curriculum_id, first_name, last_name, role, picture_URL, address, phone_number, email, description], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao inserir currículo.' });
        } else {
            res.send({ message: 'Currículo inserido com sucesso.' });
        }
    });
    db.close();
});

router.put('/:curriculum_id/', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    const {
        first_name,
        last_name,
        role,
        picture_URL,
        address,
        phone_number,
        email,
        description
    } = req.body;
    db.run(
        `UPDATE curriculum SET
        first_name = coalesce(?, first_name),
        last_name = coalesce(?, last_name),
        role = coalesce(?, role),
        picture_URL = coalesce(?, picture_URL),
        address = coalesce(?, address),
        phone_number = coalesce(?, phone_number),
        email = coalesce(?, email),
        description = coalesce(?, description)
        WHERE curriculum_id = ?`,
        [
            first_name,
            last_name,
            role,
            picture_URL,
            address,
            phone_number,
            email,
            description,
            req.params.curriculum_id,
        ], (err) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: 'Erro ao atualizar currículo.' });
                return
            }

            res.send({ message: 'Currículo atualizado com sucesso.' });

        });
    db.close();
});


router.delete('/:curriculum_id/', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.run('DELETE FROM curriculum WHERE curriculum_id = ?', [req.params.curriculum_id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao excluir currículo.' });
            return
        }
        res.send({ message: 'Currículo excluído com sucesso.' });
    });
    db.close();
});

module.exports = router;
