let myLibrary = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(name, author, pages, read) {
    let b = new Book(name, author, pages, read);
    myLibrary.push(b);
}

function render(){
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    for (let idNum = 0; idNum < myLibrary.length; idNum++){
        bookList.innerHTML += `
            <div class="list-item ${myLibrary[idNum].read ? "read-item" : ""}" data-id="${idNum}">
                <div class="item-left">
                    <h3>${myLibrary[idNum].name}</h3>
                    <p>${myLibrary[idNum].author}</p>
                    <p>${myLibrary[idNum].pages}</p>
                </div>
                <div class="item-right">
                    <label for="read-item-${idNum}">Read </label>
                    <input type="checkbox" id="read-item-${idNum}" name="read" onchange="checkedItem(${idNum});" ${myLibrary[idNum].read ? 'checked' : ''}>
                    <a class="delete-item" href="#" data-index="${idNum}" onclick="deleteEntry(${idNum});">[delete]</a>
                </div>
            </div>
        `;
    }
}

function deleteEntry(id){
    const listItem = document.querySelector(`[data-id="${id}"]`);
    listItem.classList.add("poof");
    setTimeout(() => {
        myLibrary.splice(id, 1);
        render();
    }, 250);
}

function checkedItem(item){
    myLibrary[item].read = !myLibrary[item].read; //toggle the boolean
    let a = event.target;
    const listItem = document.querySelector(`[data-id="${item}"]`);
    if(a.checked){
        listItem.classList.add("read-item");
    }else{
        listItem.classList.remove("read-item");
    }
}

let submit = document.getElementById('add-book');
submit.addEventListener("click", () => {
    let bookName = document.getElementById('book-name').value;
    let authorName = document.getElementById('author-name').value;
    let pageCount = document.getElementById('page-count').value;
    let readCheck = document.getElementById('read-check').checked;

    if(bookName == ''){
        return;
    }
    if(authorName == ''){
        authorName = "unknown author";
    }
    if(pageCount == ''){
        pageCount = "?";
    }

    pageCount+= " pages";

    addBookToLibrary(bookName, authorName, pageCount, readCheck)
    render();
    document.getElementById("form").reset();
})

var reset = document.getElementById('reset');
reset.addEventListener("click", () => {
    document.getElementById("form").reset();
})