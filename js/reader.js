//function to display notes
function displayNotes() {

    //checking if there's any data in localStorage under the key 'notes'
    const notes = localStorage.getItem('notes');
    const notesDisplay = document.getElementById('noteDisplay');

    //clearing the current notes to display
    notesDisplay.innerHTML = '';

    //checking if there are any notes to display
    if(notes) {
        // Attempt to parse notes, handling any errors
        try {
            const notesArray = JSON.parse(notes);

            // Create and append elements to display each note
            notesArray.forEach((noteObject) => {
                const noteTextarea = document.createElement('textarea');
                noteTextarea.classList.add('note');
                // const noteDiv = document.createElement('div');
                noteTextarea.textContent = noteObject.content;
                noteTextarea.readOnly = true;
                notesDisplay.appendChild(noteTextarea);
            });
        } catch (error) {
            console.error(userMessages.errorParsingNotes, error);  //Log parsing errors
        }
    }
    // Updating timestamp
    const timestampDiv = document.getElementById('lastUpdated');
    timestampDiv.textContent = userMessages.lastUpdatedText + new Date().toLocaleTimeString();

}

// Initialization function
function init() {
    displayNotes();

    let lastData = localStorage.getItem('notes');

    //setting interval to refresh notes and display them every 2 seconds
    setInterval(() => {
        const currentData = localStorage.getItem('notes');
        //checking if notes data has changed and update display if so
        if(lastData !== currentData) {
            displayNotes();
            lastData = currentData;
        }
    },2000);
}

//call init to set up
init();
