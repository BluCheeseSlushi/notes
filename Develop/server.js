const express = require('express');
const { notes } = require('./db/db.json');
const fs = require('fs');
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static(__dirname + '/public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

function createNewNote(body, notes) {
    const newNote = body;
    notes.push(newNote);
    fs.writeFileSync(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify({ notes }, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req,res) =>{
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    const postedNote = createNewNote(req.body, notes);
    res.json(postedNote);
})

app.get('/notes', (req, res) =>{
    res.sendfile('./public/notes.html');
})

app.get('/', (req, res) =>{
    res.sendfile('./public/index.html');
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
