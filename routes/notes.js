const notes = require('express').Router();
const uuid = require('../helpers/uuid');

// Helper functions for reading and writing to the JSON file
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            id: uuid(),
            title,
            text
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.error('Error in adding note');
    }
});

//DELETE route to remove notes
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);

    readFromFile('./db/db.json').then((data) => {
        const file = JSON.parse(data);

        const found = file.some(x => x.id === req.params.id);

        if (found) {
            const filtered = file.filter(x => x.id !== req.params.id);
            console.log(filtered);
            writeToFile('./db/db.json', filtered)
            res.json(filtered);
        }
        else {
            res.error('Error in removing note. Note id not found.');
        }
    });

});

module.exports = notes;