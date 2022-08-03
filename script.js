//Started at 07/31/2022, 21:04, or better at 21:16
//Refactoring started at 08/02/2022, 11:25;
let notes = [];
const storage = localStorage;

function loadFromStorage() {
    if(localStorage.getItem(0) != null) {
        notes = JSON.parse(localStorage.getItem(0));
        if(notes != null && notes.length > 0) {
            renderNotes();
        }
        
    }
    
}

function createListener(selector, functionName, parameter) {
    document.querySelector(`${selector}`).addEventListener('click', () => {
        functionName(parameter);
    })
}

function changeBackgroundColor(colorId) {
    const background = document.querySelector('.creatorBackground')
    background.className = 'creatorBackground';
    background.classList.add(colorId);
    background.id = colorId;
}

function renderNoNotes() {
    document.body.className = 'center'
    document.body.innerHTML = `
        <p class="informationText">You don't have any notes.<br>Click on the + sign to create one.</p>
        <div class="fab center rounded clickable" id="fab"><p>+</p></div>
    `;
    createListener('#fab', showEditor);
}

function showEditor(noteId = -1) {
    document.body.classList.remove('center')
    document.body.classList.add('flex', 'creator');

    document.body.innerHTML = `
    <div class="creatorBackground red" id="red">
        <header class="creatorHeader">
            <input type="text" name="creatorTitle" class="creatorTitle white-text" placeholder="Title" id="creatorTitle">
            <div class="flex">
                <div class="smallBox rounded red clickable" id="red" onclick="changeBackgroundColor(this.id)"></div>
                <div class="smallBox rounded blue clickable" id="blue" onclick="changeBackgroundColor(this.id)"></div>
                <div class="smallBox rounded green clickable" id="green" onclick="changeBackgroundColor(this.id)"></div>
                <div class="smallBox rounded purple clickable" id="purple" onclick="changeBackgroundColor(this.id)"></div>
                <div class="smallBox rounded yellow clickable" id="yellow" onclick="changeBackgroundColor(this.id)"></div>
                <div class="smallBox rounded darkgrey clickable" id="darkgrey" onclick="changeBackgroundColor(this.id)"></div>
            </div>
        </header>
        <textarea name="creatorText" class="creatorText white-text" placeholder="Type the text here..." id="creatorText"></textarea>
    </div>
    <div class="fab center clickable rounded" id="continueFab">
        <img src="arrow.png" alt="Right arrow icon">
    </div>
    <div class="fab secondFab center clickable rounded" id="homeFab">
        <img src="house.svg" alt="House icon">
    </div>
    `;
    
    if(noteId > -1) {
        document.body.innerHTML += `
        <div class="fab thirdFab center clickable rounded" id="deleteFab">
            <img src="trash.svg" alt="Trash icon">
        </div>`
        deleteItemListener(noteId)
        loadNotesData(noteId);
    }
    createListener('#homeFab', hideEditor, noteId);
    createListener('#continueFab', createNote, noteId);

}

function deleteItemListener(noteId) {
    let deleteFab = document.querySelector('#deleteFab');
        
    deleteFab.addEventListener('click', () => {
        notes.splice(noteId, 1);
        saveOnStorage();
        hideEditor();
    })
}
function loadNotesData(noteId) {
    document.querySelector('[name="creatorTitle"]').value = notes[noteId]['title'];
    document.querySelector('[name="creatorText"]').value = notes[noteId]['text'];
    document.querySelector('.creatorBackground').backgroundColor = changeBackgroundColor(notes[noteId]['color']);
}

function hideEditor() {
    if(notes.length > 0) {
        renderNotes();
    } else {
        renderNoNotes();
    }
}

function getNoteInformation() {
    const noteTitle = document.querySelector('.creatorTitle').value;
    const noteText = document.querySelector('.creatorText').value;
    const noteBackgroundColor = document.querySelector('.creatorBackground').id;
    
    return [noteTitle, noteText, noteBackgroundColor];
}

function createNote(noteId) {
    const noteArray = getNoteInformation();

    const noteInfo = {
            title: `${noteArray[0]}`,
            text: `${noteArray[1]}`,
            color: `${noteArray[2]}`
            }

    if (noteId < 0) {
        notes.push(noteInfo);
        saveOnStorage();
    } else {
        notes[noteId] = noteInfo;
        saveOnStorage();
    }
    
    hideEditor();

}
function saveOnStorage() {
    //Salvar o array inteiro parece ser algo mais interessante
    if (storage.length > 0) {
        for (let i = 0; i < storage.length; i++) {
            deleteOfStorage(i);
        }
    }

    storage.setItem(0, `${JSON.stringify(notes)}`);
}

function deleteOfStorage(index) {
    storage.removeItem(index);
}

function getNoteData(index) {
    let color = notes[index].color;
    let title = notes[index].title;
    let text = notes[index].text;

    if (notes[index].title.length > 6) {
        title = title.slice(0, 6) + '...';
    }
    if (notes[index].text.length > 69) {
        text = text.slice(0, 69) + '...';
    }
    return [color, title, text];
    
}
function renderNotes() {  
    document.body.className = 'flex';
    document.body.innerHTML = `
    <div class="home flex wrap">
    <div class="fab center rounded clickable" id="fab"><p>+</p></div>`

    const parentDiv = document.querySelector(".home");
    for (let i = 0; i < notes.length; i++) {
        dataArray = getNoteData(i); 
        parentDiv.innerHTML += `
        <div class="clickable notesCard rounded ${dataArray[0]}" onclick="showEditor(${i})">
            <h1 class="notesTitle">${dataArray[1]}</h1>
            <p class="notesText">${dataArray[2]}</p>
        </div>`
        
    }
    createListener('#fab', showEditor);
}
loadFromStorage();
createListener('#fab', showEditor);