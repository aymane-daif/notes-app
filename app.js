const bodys = document.querySelectorAll(".body");
const markdownForm = document.getElementById("markdown");
let titleText = document.getElementById("title");
let categoryText = document.getElementById("category");
let bodyText = document.getElementById("body");
const previewBtn = document.getElementById("preview");
const saveBtn = document.getElementById("save");
const notesContent = document.querySelector(".notes.all-notes .notes-content");
const categoriesContent = document.querySelector(".full-main .categories ul");
const countNotes = document.querySelector(".all-notes h1");

let bodyMarked;
let titleMarked;
let categoryMarked;
let notes = [];
let categories = [];

saveBtn.addEventListener("click", () => {
  saveNote();
});

categoriesContent.addEventListener("click", (e) => {
  let selectedCat;
  Array.from(categoriesContent.children, (li) => {
    li.className = "";
  });
  if (e.target.tagName === "DIV") {
    selectedCat = e.target.previousElementSibling.innerText;
    if (!e.target.parentElement.classList.contains("selected")) {
      e.target.parentElement.classList.add("selected");
    }
  } else if (e.target.tagName === "LI" || e.target.tagName === "A") {
    selectedCat = e.target.innerText;
    if (e.target.tagName === "A") {
      if (!e.target.parentElement.classList.contains("selected")) {
        e.target.parentElement.classList.add("selected");
      }
    } else {
      if (!e.target.classList.contains("selected")) {
        e.target.classList.add("selected");
      }
    }
  }
  showNotes(selectedCat);

  notesContent.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("delete") ||
      e.target.parentElement.classList.contains("delete")
    ) {
      let id = Number(e.target.getAttribute("data-id"));

      notes = notes.filter((note) => {
        if (note.id !== id) return true;
        else return false;
      });
      showNotes(selectedCat);
    }
  });
});

function showNotes(categ) {
  let count = 0;

  notesContent.innerHTML = "";

  let selectedNotes = notes.filter((note) => {
    if (note.category === categ) {
      count++;
      return true;
    } else return false;
  });
  countNotes.innerHTML = `Notes (${count})`;
  selectedNotes.forEach((note) => {
    let val = "";
    if (note.body.length > 20) {
      val = note.body.substring(0, 100);
      val += "...";
    }
    notesContent.innerHTML += `
    <div class="note">
    <div class="left">
      <h3 class="title">${note.title}</h3>
      <p class="body">
      ${val}
      </p>
      <span class="time">1min ago</span>
    </div>
    <div class="right">
      <div class="delete" data-id=${note.id} >
        <img src="./images/trash.svg" alt="trash-icon" data-id=${note.id} />
      </div>
    </div>
    </div>
    `;
  });
}

function saveNote() {
  let capitalizedCateg = capitalize(categoryText.value.toLowerCase()).trim();
  notes.push({
    id: Math.floor(Math.random() * 10000),
    title: titleText.value,
    category: capitalizedCateg,
    body: bodyText.value,
  });

  if (!categories.includes(capitalizedCateg)) {
    categories.push(capitalizedCateg);
  }
  showCategories();
  showNotes(capitalizedCateg);
  Array.from(categoriesContent.children, (li) => {
    if (li.innerText === capitalizedCateg) li.classList.add("selected");
  });
  notesContent.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("delete") ||
      e.target.parentElement.classList.contains("delete")
    ) {
      let id = Number(e.target.getAttribute("data-id"));

      notes = notes.filter((note) => {
        if (note.id !== id) return true;
        else return false;
      });
      showNotes(capitalizedCateg);
    }
  });
}

function showCategories() {
  categoriesContent.innerHTML = "";

  categories.forEach((category) => {
    categoriesContent.innerHTML += `
      <li>
        <a href="#">${category}</a>
        <div class="slide"></div>
      </li> 
      `;
  });
}
function capitalize(msg) {
  return msg.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
}

previewBtn.addEventListener("click", (e) => {
  if (e.target.textContent === "Previeuw the body") {
    bodyMarked = bodyText.value;
    titleMarked = titleText.value;
    categoryMarked = categoryText.value;
    markdownForm.innerHTML = `
    <div class="preview">
      <div>
        <span class="preview-text">Title: </span>
        <span>${titleMarked}</span>
      </div>
      <div>
        <span class="preview-text">Category: </span>
        <span>${categoryMarked}</span> 
      </div>
      <div class="preview-body">
        <span class="preview-text">Body: </span>
        <div>${marked(bodyMarked)}</div> 
      </div>
      
    </div>
    `;
    e.target.textContent = "Edit your note";
  } else if (e.target.textContent === "Edit your note") {
    markdownForm.innerHTML = `
    <div class="markdown-title">
            <label for="title">Title: </label>
            <input type="text" name="title" id="title" value=${titleMarked} />
          </div>
          <div class="markdown-category">
            <label for="category">Category: </label>
            <input type="text" name="category" id="category" value=${categoryMarked} />
          </div>
          <div class="markdown-body">
            <label for="body">Body: </label>
            <textarea name="body" id="body">${bodyMarked}</textarea>
          </div>
    `;
    titleText = document.getElementById("title");
    categoryText = document.getElementById("category");
    bodyText = document.getElementById("body");
    e.target.textContent = "Previeuw the body";
  }
});
