const fs = require('fs');
console.log('starting notes');

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json').toString();
    return JSON.parse(notesString);
  } catch (error) {
    console.log('File don´t exist, creating file...');
    return [];    
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));          
};

const isDuplicatedNote = (notes, newNote) => {
  const duplicatedNotes = notes.filter(note => note.title === newNote.title);
  return !(duplicatedNotes.length === 0);
}

const addNote = (title, body) => {
  console.log('Adding note ', title, body);
  const notes = fetchNotes();
  const note = {
    title,
    body
  };

  if (!isDuplicatedNote(notes, note)) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getAll = () => {
  return fetchNotes();
};

const remove = (title) => {
  const notes = fetchNotes()
  const filterNotes = notes.filter(note => note.title !== title);
  if (notes.length !== filterNotes.length) {
    saveNotes(filterNotes);
    return true;
  }
  return false;
};

const getNote = (title) => {
  const notes = fetchNotes();
  const filterNotes = notes.filter(note => note.title === title);
  return filterNotes[0];
};

const logNote = (note) => {
  console.log('---');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  remove,
  getNote,
  logNote
}