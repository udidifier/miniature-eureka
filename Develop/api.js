const express = require('express')
const app = express()
const port = 8080
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/api/notes', (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (err, data) => {

        if (err) {
            console.error(err);
            return;
        }
        const currentNotes = JSON.parse(data)
        currentNotes.push(req.body)

        currentNotes.map((note, idx) => {
            note.id = idx
        })
        
        

        fs.writeFileSync('./db/db.json', JSON.stringify(currentNotes));

        res.send('200')
    });
})
app.get('/api/notes', (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        
        if (err) {
            console.error(err);
            return;
        }

        res.send(data)
    });
})
app.delete('/api/notes/:noteId',(req,res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {

        if (err) {
            console.error(err);
            return;
        }
        const currentNotes = JSON.parse(data).filter((note) => note.id !== parseInt(req.params.noteId))
        

        fs.writeFileSync('./db/db.json', JSON.stringify(currentNotes));

        res.send('200')
    });
})

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})