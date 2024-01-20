//function to display notes
function displayNotes() {
    //TODO: implement the display logic

    //checking if there's any data in localStorage under the key 'notes'
    const notes = localStorage.getItem('notes');
    const notesDisplay = document.getElementById('noteDisplay');

    //clearing the current notes to display
    notesDisplay.innerHTML = '';

    //checking if there are any notes to display
    if(notes) {
        // Attempt to parse notes, handle any errors
        try {

            const notesArray = JSON.parse(notes);

            // Create and append elements to display each note
            notesArray.forEach((noteObject) => {
                const noteDiv = document.createElement('div');
                noteDiv.classList.add('note');
                noteDiv.textContent = noteObject.content; // Ensure this matches the property name of your note objects
                notesDisplay.appendChild(noteDiv);
            });
        } catch (error) {
            console.error('Error parsing notes:', error);
            // Handle the error, maybe display a message to the user
        }

        // //parse the notes from the JSON string back into an array
        // const notesArray = JSON.parse(notes);
        //
        // //create and append elements to display each note
        // notesArray.forEach((noteObject) => {
        //     const noteDiv = document.createElement('div');
        //     noteDiv.classList.add('note');
        //     noteDiv.textContent = noteObject.content;
        //     notesDisplay.appendChild(noteDiv);
        // });
    }
// Update timestamp
    const timestampDiv = document.getElementById('lastUpdated'); // Assuming you have an element with this ID
    timestampDiv.textContent = 'Last updated: ' + new Date().toLocaleTimeString();

}

//initial setup
function init() {
    displayNotes();

    let lastData = localStorage.getItem('notes');

    setInterval(() => {
        const currentData = localStorage.getItem('notes');
        //comparing the current data with the last data
        if(lastData !== currentData) {
            displayNotes();
            lastData = currentData;
        }
    },2000);
}

//call init to set up
init();
