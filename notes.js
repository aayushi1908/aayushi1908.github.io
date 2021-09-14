let addBtn = document.getElementById("addBtn");
let notesArea = document.getElementById("notes");
let notes = localStorage.getItem("notes");
if (notes == null) {
  notesObj = [];
} else {
  notesObj = JSON.parse(notes);
}
showNotes();

// ADD NOTE
addBtn.addEventListener("click", function (e) {
  let addTitle = document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  //   let notes = localStorage.getItem("notes");

  //   if (notes == null) {
  //     notesObj = [];
  //   } else {
  //     notesObj = JSON.parse(notes);
  //   }

  let myObj = {
      title: addTitle.value,
      text: addTxt.value
  }

  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";

  showNotes();
});

// SHOW NOTES
function showNotes() {
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="noteCard card my-2 mx-2" style="width:18rem";>
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <button class="btn btn-primary" id="${index}" onclick="deleteNote(this.id)">Delete note</button>
            </div>
          </div>`;
  });
  if (notesObj.length != 0) {
    notesArea.innerHTML = html;
  } else {
    notesArea.innerHTML = `<p>You haven't added any notes.</p>`;
  }
}

// DELETE
function deleteNote(index) {
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// SEARCH
let search = document.getElementById("searchTxt");
search.addEventListener("input", searchFun);

function searchFun(id = null) {
  let inputVal = search.value.toLowerCase();

  let noteCard = document.getElementsByClassName("noteCard");
  Array.from(noteCard).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
}

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchFun);
