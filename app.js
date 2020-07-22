const yargs = require('yargs');

const noteUtilities = require('./note_Utilities');



//use it as a node app.js add --title="anyString" --body="anyString"......................................
yargs.command({
    command: 'add',
    describe: 'add note',
    builder: {
        title: {
            describe: 'title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(newNote){
        noteUtilities.addNote(newNote.title, newNote.body);
    }
});

//use it as a node app.js remove --title="anyString"...................................................
yargs.command({
    command: 'remove',
    describe: 'remove note',
    builder: {
        title: {
            describe: 'title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(note){
        noteUtilities.removeNote(note.title);
    }
});


//use it as a node app.js list...................................................................................
yargs.command({
    command: 'list',
    describe: 'List of note',
    handler: function(){
        noteUtilities.getTheNotes();
    }
});


//use it as a node app.js read --title="anyString" .........................................................
yargs.command({
    command: 'read',
    describe: 'read the note',
    builder: {
        title: {
            describe: 'title of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(note){
        noteUtilities.readNote(note.title)
    }
});


//use it as a node app.js update --title="anyString" --body="anyString"......................................
yargs.command({
    command: 'update',
    describe: 'update the note in list',
    builder: {
        title: {
            describe: 'title of the note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(note){
        noteUtilities.updateNote(note);
    }
})


yargs.parse();