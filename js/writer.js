
//constructor for a Note
function Note(content) {
    this.content = content
}

//Function to load existing notes from localStorage
function loadNotes() {
    //check if there's any data in localStorage under the key 'notes'
    const notes = localStorage.getItem('notes');

    //if there is data, parse it from the JSON string back into an array
    if(notes) {
        const notesArray = JSON.parse(notes);
        //for each note object in the array, create a text area element
        notesArray.forEach((noteObject) => {
            createNoteElement(noteObject.content)
        })
    }
}

// Initialization function
function init() {
    //load existing notes from localStorage
    loadNotes();

    //event listener for adding a new note to 'Add Note' button
    document.getElementById('addNote').addEventListener('click', addNewNote);
}

//Function to create and display a new note element
function createNoteElement(content) {
    //create a new div to hold the note and the remove button
    const noteElement = document.createElement('div');
    noteElement.classList.add('note')

    //create a new text area for the note content
    const textArea = document.createElement('textarea');

    textArea.value = content;
    noteElement.appendChild(textArea);

    //create a remove button for the note
    const removeButton = document.createElement('button');
    removeButton.textContent = userMessages.removeNoteButton;
    //add an event listener to the remove button that will call a function to remove the note
    removeButton.addEventListener('click',function() {
        removeNoteElement(noteElement);
    });
    noteElement.appendChild(removeButton);

    //append the note element to the container on the page for having notes
    document.getElementById('noteContainer').appendChild(noteElement);
    saveNotes();
}

//Function to add a new empty note
function addNewNote() {
    const noteContainer = document.getElementById('noteContainer');
    createNoteElement('');
}

//Function to remove a note element and update localStorage
function removeNoteElement(noteElement) {
    //remove the note element from the DOM
    noteElement.remove();
    //updates the notes array and save it to localStorage
    saveNotes();
}

/**
 * This function is critical as it saves the current state of
 * notes to localStorage. It selects all textarea elements
 * (which contain the notes' content), converts them into
 * an array, maps over the array to create a new array of
 * Note objects, then converts this array into a JSON
 * string and saves it under the key 'notes' in localStorage.
 */
//Function to save the current state of notes to localStorage
function saveNotes() {
    //selects all textarea elements and stores them in a NodeList.
    const notesElements = document.querySelectorAll('textarea');
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();

    //update the 'last saved at' time display
    document.getElementById('lastSavedTime').textContent = userMessages.lastSavedText + " " + formattedTime;
    //converts the NodeList to a true array and maps over it
    //for each textarea element, it creates a new Note object
    const notesArray = Array.from(notesElements).map(textArea => {
        return new Note(textArea.value);
    });
/*
note objects (notesArray) which are in javascript object format are converted into a JSON string.
this process is known as serialization. it's necessary because 'localStorage' can only store string.
here, 'notesArray' - an array of note objects  - is converted to a JSON string.

Deserialization - convert a JSON string back into a javascript object. when we load notes from
'localStorage', you use JSON.parse() to turn the stored string back into a javascript array of objects

 */
    //also converts the array of Note objects into a JSON string
    //saves the JSON string to localStorage under the key 'notes'
    localStorage.setItem('notes',JSON.stringify(notesArray));
}

//call init to set up the event listeners.
init();
