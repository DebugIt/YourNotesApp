// Updating the existing project with a new change title name function
console.log("Welcome to YourNotes");
showNotes();

// ----Logic----
// If a user adds notes, add it to the local storage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {

    let addtxt = document.getElementById("addtxt");
    let addtitle = document.getElementById("addtitle");

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myobj = {
        title: addtitle.value,
        text: addtxt.value
    }
    notesObj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    addtitle.value = "";
    // console.log(notesObj);

    // show notes function
    showNotes();

});
// Show notes logic
// Reads the elements from the local storage and displays on the page
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    // Logic for making a new noteCard for every new note added
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem; border-radius: 10px;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="DeleteNt(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
        
        `

    });
    // Logic for displaying a message if no notes are added
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show!  Try adding notes`;
    }
}

// Deleting note Logic
// Deletes a particular noteCard from page and localStorage
function DeleteNt(index) {
    // console.log('Deleting note with index: ', index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);      // Takes the 1st argument and ask's number of element to remove
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();        // Now we need to update the localStorage

}


// Search Function
let search = document.getElementById("searchtxt");
search.addEventListener("input", function () {

    let inpVal = search.value.toLowerCase();
    // console.log("search func. was fired!!", inpVal);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardtxt);
        // now setting a condition to check for accurate result
        if (cardtxt.includes(inpVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";

        }

    });

});