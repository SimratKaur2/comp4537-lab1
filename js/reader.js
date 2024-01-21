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
                const noteDiv = document.createElement('div');
                noteDiv.classList.add('note');
                noteDiv.textContent = noteObject.content; // Display note content
                notesDisplay.appendChild(noteDiv);
            });
        } catch (error) {
            console.error('Error parsing notes:', error);  //Log parsing errors
        }
    }
    // Updating timestamp
    const timestampDiv = document.getElementById('lastUpdated');
    timestampDiv.textContent = 'Last updated: ' + new Date().toLocaleTimeString();

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
