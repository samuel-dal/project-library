const mainContainer = document.querySelector('.main-container');
const bottomMain = document.querySelector('.bottom-main');
const root = document.querySelector(':root');
const getInput = document.querySelectorAll('.dialog label input');
const addNewBook = document.querySelector('.add-new-book');
const dialog = document.querySelector('.dialog');
const closeDialog = document.querySelector('.close-dialog');
const addBook = document.querySelector('.add-book');


const myLibrary = [];

const booksLibrary = [
  {
    id: crypto.randomUUID(), 
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    isRead: false
  },
  {
    id: crypto.randomUUID(), 
    title: "1984",
    author: "George Orwell",
    pages: 328,
    isRead: false
  },
  {
    id: crypto.randomUUID(), 
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    isRead: false
  },
  {
    id: crypto.randomUUID(), 
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
    isRead: false
  },
  {
    id: crypto.randomUUID(), 
    title: "Moby-Dick",
    author: "Herman Melville",
    pages: 635,
    isRead: false
  },
  {
    id: crypto.randomUUID(), 
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    pages: 214,
    isRead: false
  },
  {
    id: crypto.randomUUID(), 
    title: "Brave New World",
    author: "Aldous Huxley",
    pages: 268,
    isRead: false
  },
  {
    id: crypto.randomUUID(), 
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
    isRead: false
  },
  {
    id: crypto.randomUUID(), 
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    pages: 194,
    isRead: false
  }
];

let latestVal = 0;

class Book {
   constructor(id, title, author, pages, isRead) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.isRead = isRead;
   }

   addOneBook(library) {
    library.push({
      id: this.id, 
      title: this.title,
      author: this.author,
      pages: this.pages,
      isRead: this.isRead
    });
    //
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.id = this.id;
    bookDiv.setAttribute('data-index-value', latestVal);

    const titleDiv = document.createElement('div');
    titleDiv.className = 'title';
    titleDiv.textContent = this.title;

    const authorDiv = document.createElement('div');
    authorDiv.className = 'author';
    authorDiv.textContent = this.author;

    const pageDiv = document.createElement('div');
    pageDiv.className = 'page';
    pageDiv.textContent = this.pages;

    const svgDiv = document.createElement('div');
    svgDiv.className = 'action-btn';

    const readBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    readBtn.textContent = 'Not Read';
    readBtn.value = 'Read';
    deleteBtn.textContent = 'Delete';
    deleteBtn.value = 'Delete';
    deleteBtn.setAttribute('data-index-value', latestVal);

    svgDiv.appendChild(readBtn);
    svgDiv.appendChild(deleteBtn);

    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(pageDiv);
    bookDiv.appendChild(svgDiv);
    bottomMain.appendChild(bookDiv);
    //
   latestVal++;
   }
}

let book = new Book();

const generateBook = (library) => {
  library.forEach((bookItem, bookIndex) => {
    let addBooks = new Book(crypto.randomUUID(), bookItem.title, bookItem.author, bookItem.pages, bookItem.isRead);
    addBooks.addOneBook(myLibrary);
  });
}

generateBook(booksLibrary);

const toRead = (target, color, text) => {
  target.style.backgroundColor = color;//'var(--bg-color)'
  target.textContent = text;//'Not Read'
}

const toggleRead = (target) => {
  if (target.textContent === 'Done Read') {
    toRead(target, 'var(--bg-color)', 'Not Read');
    return;
  }

  if (target.textContent === 'Not Read') {
    toRead(target, 'var(--read-btn)', 'Done Read');
    return;
  }
}

const toggleDialog = () => {
  dialog.open ? root.style.setProperty('--display-form', 'none') : root.style.setProperty('--display-form', 'flex');
  dialog.open = !dialog.open;
}

const removeEl = (target) => {
  const bookList = document.querySelectorAll('.book');

  bookList.forEach((listItem, listIndex) => {
    if (listItem.dataset.indexValue === target.dataset.indexValue) {
      listItem.remove();
      myLibrary.splice(listIndex, 1);
    }
  });
}

const toAddBook = () => {
  let title = getInput[0].value;
  let author = getInput[1].value;
  let pages = getInput[2].value;

  if (title === '' || author === '' || pages === '') {
    return;
  }

  const newBook = new Book(crypto.randomUUID(), title, author, pages, false);
  newBook.addOneBook(myLibrary);
  toggleDialog();
  getInput[0].value = '';
  getInput[1].value = '';
  getInput[2].value = '';
}

let bookSize = 0;//px

const bookWidth = (width) => {
  root.style.setProperty('--book-grid-template', `repeat(auto-fit, minmax(14rem, ${width}))`);
}

const bookSizes = () => {
  const bookList = document.querySelectorAll('.book');
  bookSize = 0;
  bookSize = Math.floor(bookList[0].offsetWidth) - 0.5;
  console.log(bookSize);

  if (myLibrary.length <= 4) {
    bookWidth(`${bookSize}px`);
  } else {
    bookWidth(`1fr`);
  }
}

window.addEventListener('resize', (e) => {
  bookSizes();
});

document.addEventListener('click', event => {
  const eTarget = event.target;

  if (eTarget.value === 'Delete') {
    removeEl(eTarget);
  }

  if (eTarget.value === 'Read') {
    toggleRead(eTarget);
  }

  if (eTarget.className === 'add-book') {
    toAddBook();
  }

  bookSizes();
});



addNewBook.addEventListener('click', (e) => {
  toggleDialog();
});

closeDialog.addEventListener('click', (e) => {
  toggleDialog();
});