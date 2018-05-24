console.log('Starting app');

const fs = require('fs');
const yargs = require('yargs');
const _ = require('lodash');

titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'Remove note', {
    title: titleOptions
  })
  .argv;
const notes = require('./notes');
var command = argv._[0];

if(command === 'add') {
  const resp = notes.addNote(argv.title, argv.body);
  if (resp) {
    console.log('note added');
    notes.logNote(resp);
  } else {
    console.log('Not title taken')
  }
} else if (command === 'list') {
  const resp = notes.getAll();
  console.log(`Fetching ${resp.length} note(s)...`);
  resp.forEach(note => notes.logNote(note));
} else if (command === 'read') {
  const note = notes.getNote(argv.title);
  const message = note ? `note ${argv.title}: ${note.body}` : `note ${argv.title} don´t exist`;
  console.log(message);
} else if (command === 'remove') {
  const resp = notes.remove(argv.title);
  if (resp) {
    console.log('not fund');
    notes.logNote(resp);
  } else {
    console.log('Note not found')
  }
} else {
  console.log('commando invalid');
}



