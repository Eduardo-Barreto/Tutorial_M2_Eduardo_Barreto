const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3031;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'banco.db';

app.use(express.json());

app.get('/experiencias', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.all('SELECT * FROM experiences WHERE curriculum_id = ? ORDER BY end_year DESC', [req.query.curriculum_id], (err, rows) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao buscar experiências.' });
        } else {
            res.send(rows);
        }
    });
    db.close();
});

app.post('/experiencias', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    const { curriculum_id, company_name, role, description, start_year, end_year } = req.body;
    db.run('INSERT INTO experiences (curriculum_id, company_name, role, description, start_year, end_year) VALUES (?, ?, ?, ?, ?, ?)', [curriculum_id, company_name, role, description, start_year, end_year], (err) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao inserir experiência.' });
        } else {
            res.send({ message: 'Experiência inserida com sucesso.' });
        }
    });
    db.close();
});

app.put('/experiencias', (req, res) => {
    const { experience_id, company_name, role, description, start_year, end_year } = req.body;
    var db = new sqlite3.Database(DBPATH);
    db.run('UPDATE experiences SET company_name = ?, role = ?, description = ?, start_year = ?, end_year = ? WHERE experience_id = ?', [company_name, role, description, start_year, end_year, experience_id], (err) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao atualizar experiência.' });
            return
        }

        res.send({ message: 'Experiência atualizada com sucesso.' });

    });
    db.close();
});


app.delete('/experiencias', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
    db.run('DELETE FROM experiences WHERE curriculum_id = ? AND experience_id = ?', [req.query.curriculum_id, req.query.experience_id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao excluir experiência.' });
            return
        }
        res.send({ message: 'Experiência excluída com sucesso.' });
    });
    db.close();
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});