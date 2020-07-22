const fs = require('fs');
const { parse } = require('path');
const chalk = require('chalk');

//get the list of all notes...........................................................................
const getTheNotes = () => {
    const notes = loadNote();

    if(notes.length === 0) {
        console.log(chalk.green.inverse.bold("there is not any NOte to display..."));
    }else{
        console.log(notes);
    }
}

//read the single note from the note list.........................................................
const readNote = (noteTitle) => {
    const notes = loadNote();

    const cloneNotes = notes.filter(
        (note) => note.title === noteTitle
    );

    if(cloneNotes.length === 1){
        console.log(cloneNotes);
    }else{
        console.log(chalk.red.inverse.bold('Note is not found....'));
    }
}

//add new note..................................................................................
const addNote = (title,body) => {
    const notes = loadNote();
    const dummyNotes = notes.filter(
        (note) => note.title ===title
    );
    
    if(dummyNotes.length > 0){
        console.log(chalk.red.inverse.bold('Note is exist...!'));
    }else{
        notes.push({
            title: title,
            body: body
        });
        saveData(notes);
        console.log(chalk.green.inverse.bold("Note atdded successfully..."))
    }
}

//remove note form file.........................................................................................
const removeNote = (noteTitle) => {
    const notes = loadNote();

    const cloneNotes = notes.filter(
        (note) => note.title !== noteTitle 
    );

    if(notes > cloneNotes){
        console.log(chalk.green.inverse.bold( noteTitle + " successfully removed..."));
        saveData(cloneNotes);
    }else{
        console.log(chalk.red.inverse.bold('note not found...'));
    }
}


//update the existing note.....................
const updateNote = (note) => {
    const notes = loadNote();
    const dummyNote = notes.filter(
        (oneNote) => oneNote.title === note.title
    );
    if(dummyNote.length === 1){
        const newNotes = notes.filter(
            (oneNote) => oneNote.title !== note.title
        );
        newNotes.push({
            title: note.title,
            body: note.body
        });
        saveData(newNotes);
        console.log(chalk.green.inverse.bold("note updated successfully..."));
    }else{
        console.log(chalk.red.inverse.bold("note does not exist"))
    }

}


//save after performing any opertion...................................................................................................
const saveData = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}


//load the notes from the file........................................................................................
const loadNote = () => {
    try{
        const notesBuff = fs.readFileSync('notes.json');
        const notes = JSON.parse(notesBuff);
        return notes;
    }
    catch(e){
        return [];
    }
}

module.exports = {
    getTheNotes: getTheNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    updateNote: updateNote
}