//Started at 07/31/2022, 21:04, or better at 21:16;
const fabButton = document.querySelector('#fab');
const cards = [];
let isCreating = false;
let isEditing = false;

function changeColor(id) {
    if (isCreating || isEditing) {
        const background = document.querySelector('.creatorBackground')
        background.className = 'creatorBackground';
        background.classList.add(id)
        background.id = id
    }
}
function renderNoNotes() {
    document.body.classList.remove('creator', 'flex');
    document.body.classList.add('center');
    document.body.innerHTML = `
        <p class="informationText">You don't have any notes.<br>Click on the + sign to create one.</p>
        <div class="fab center rounded clickable" id="fab"><p>+</p></div>
        <script src="script.js"></script>
    `;
    const fab = document.querySelector("#fab");
    fab.addEventListener('click', () => {
        showCreator('creating');
    })
}
function showCreator(reason, id) {
    
    document.body.classList.remove('center')
    document.body.classList.add('flex', 'creator');
    document.body.innerHTML = `
    <div class="creatorBackground red" id="red">
        <header class="creatorHeader">
            <input type="text" name="creatorTitle" class="creatorTitle white-text" placeholder="Title" id="creatorTitle">
            <div class="flex">
                <div class="smallBox rounded red clickable" id="red" onclick="changeColor(this.id)"></div>
                <div class="smallBox rounded blue clickable" id="blue" onclick="changeColor(this.id)"></div>
                <div class="smallBox rounded green clickable" id="green" onclick="changeColor(this.id)"></div>
                <div class="smallBox rounded purple clickable" id="purple" onclick="changeColor(this.id)"></div>
                <div class="smallBox rounded yellow clickable" id="yellow" onclick="changeColor(this.id)"></div>
                <div class="smallBox rounded darkgrey clickable" id="darkgrey" onclick="changeColor(this.id)"></div>
            </div>
        </header>
        <textarea name="creatorText" class="creatorText white-text" placeholder="Type the text here..." id="creatorText"></textarea>
    </div>
    <div class="fab center clickable rounded" id="continueFab">
        <p>&#x1F862;</p>
    </div>
    <div class="fab secondFab center clickable rounded" id="homeFab">
        <img src="house.svg" alt="House icon">
    </div>
    `;
    
    if(reason == 'editing') {
        isEditing = true;
        isCreating = false;

        document.body.innerHTML += `
        <div class="fab thirdFab center clickable rounded" id="deleteFab">
            <img src="trash.svg" alt="Trash icon">
        </div>`
        let deleteFab = document.querySelector('#deleteFab');
        
        deleteFab.addEventListener('click', () => {
            cards.splice(id, 1);
            hideCreator();
        })
        
        document.querySelector('[name="creatorTitle"]').value = cards[id]['title'];
        document.querySelector('[name="creatorText"]').value = cards[id]['text'];
        document.querySelector('.creatorBackground').backgroundColor = changeColor(cards[id]['color']);
    } else {
        isCreating = true;
    }

    homeFab = document.querySelector("#homeFab");
    continueFab = document.querySelector("#continueFab");
    homeFab.addEventListener('click', () => {
        isCreating = false;
        hideCreator(id);
    })
    continueFab.addEventListener('click', () => {
        createNote(id);
    })
}
function hideCreator() {
    if(cards.length > 0) {
        renderNotes();
    } else {
        renderNoNotes();
    }
}
function createNote(id) {
    const color = document.querySelector('.creatorBackground').id;
    const noteTitle = document.querySelector('.creatorTitle').value;
    const noteText = document.querySelector('.creatorText').value;
    const cardInfo = {
            title: `${noteTitle}`,
            text: `${noteText}`,
            color: `${color}`
            }
    if (isCreating) {
        cards.push(cardInfo);
        isCreating = false;

    }else {
        cards[id] = cardInfo;
    }
    hideCreator();
}
function renderNotes() {    
        document.body.classList.remove('creator');

        document.body.innerHTML = `
        <div class="home flex wrap">
        <div class="fab center rounded clickable" id="fab"><p>+</p></div>
        <script src="script.js"></script>`

        const parentDiv = document.querySelector(".home");
        for (let i = 0; i < cards.length; i++) {
            let color = cards[i].color;
            let title = cards[i].title;
            let text = cards[i].text;

            if (cards[i].title.length > 6) {
                title = title.slice(0, 6) + '...';
            }
            if (cards[i].title.length > 69) {
                text = text.slice(0, 69) + '...';
            }
           
            parentDiv.innerHTML += `
            <div class="clickable notesCard rounded ${color}" onclick="showCreator('editing', ${i})">
                <h1 class="notesTitle">${title}</h1>
                <p class="notesText">${text}</p>
            </div>`
            
        }
        const fab = document.querySelector('#fab');
        fab.addEventListener('click', () => {
            showCreator('creating');
        })
}


fabButton.addEventListener('click', () => {
    showCreator('creating');
})