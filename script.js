const mainContainer = document.querySelector('.main-container');
const bottomMain = document.querySelector('.bottom-main');
const root = document.querySelector(':root');
const getInput = document.querySelectorAll('.dialog label input');
const addNewBook = document.querySelector('.add-new-book');
const dialog = document.querySelector('.dialog');
const closeDialog = document.querySelector('.close-dialog');
const addBook = document.querySelector('.add-book');


const books = [
  {
    id: 1, 
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    isRead: false
  },
  {
    id: 2, 
    title: "1984",
    author: "George Orwell",
    pages: 328,
    isRead: false
  },
  {
    id: 3, 
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    isRead: false
  },
  {
    id: 4, 
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
    isRead: false
  },
  {
    id: 5, 
    title: "Moby-Dick",
    author: "Herman Melville",
    pages: 635,
    isRead: false
  },
  {
    id: 6, 
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    pages: 214,
    isRead: false
  },
  {
    id: 7, 
    title: "Brave New World",
    author: "Aldous Huxley",
    pages: 268,
    isRead: false
  },
  {
    id: 8, 
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
    isRead: false
  },
  {
    id: 9, 
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    pages: 194,
    isRead: false
  }
];

let uniqueBookId = books[books.length - 1].id;

const resetBook = () => {
  bottomMain.innerHTML = '';
}

const createBook = (bookId, bookTitle, bookAuthor, bookPages, isRead) => {
  let saveSvg = isRead ? `<svg onclick='toReadBook(${bookId})' class='read' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Done read!</title><path onclick='toReadBook(${bookId})' d="M16.75 22.16L14 19.16L15.16 18L16.75 19.59L20.34 16L21.5 17.41L16.75 22.16M18 2C19.1 2 20 2.9 20 4V13.34C19.37 13.12 18.7 13 18 13V4H13V12L10.5 9.75L8 12V4H6V20H12.08C12.2 20.72 12.45 21.39 12.8 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H18Z" /></svg>` : `<svg onclick='toReadBook(${bookId})' class='not-read'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="is-read"><title>Not read yet</title><path onclick='toReadBook(${bookId})' d="M18,2A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H18M18,4H13V12L10.5,9.75L8,12V4H6V20H18V4Z" /></svg>`;
  return `
      <div class="book" id="${bookId}">
        <div class="title">${bookTitle}</div>
        <div class="author">- ${bookAuthor}</div>
        <div class="page">${bookPages} pages</div>
        <div class="action-btn">
          ${saveSvg}
          <svg onclick='toDeleteBook(${bookId})' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="delete ${bookId}"><title>Delete ${bookTitle}?</title><path onclick='toDeleteBook(${bookId})' d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" class="delete"/></svg>
        </div>
      </div>
    `;
}

const toDeleteBook = (bookId) => {
  books.filter((item, index) => {
    if (item.id === bookId) {
      books.splice(index, 1);
      updateBook();
      return;
    }
  });
}

const toReadBook = (bookId) => {
  books.filter((item, index) => {
    if (item.id === bookId) {
      item.isRead = !item.isRead;
      updateBook();
      return;
    }
  });
}


const updateBook = () => {
  resetBook();
  books.forEach(bookItem => {
    bottomMain.innerHTML += createBook(bookItem.id, bookItem.title, bookItem.author, bookItem.pages, bookItem.isRead);
  });
}

updateBook();

const toAddBook = () => {
  let title = getInput[0].value;
  let author = getInput[1].value;
  let pages = getInput[2].value;

  if (title === '' || author === '' || pages === '') {
    return;
  }

  uniqueBookId++;

  let newBook = {
    id: uniqueBookId, 
    title: title,
    author: author,
    pages: pages,
    isRead: false
  }

  books.push(newBook);
  updateBook();
  getInput.forEach(inputItem => inputItem.value = '');
}

toAddBook();

const toggleDialog = () => {
  dialog.open ? root.style.setProperty('--display-form', 'none') : root.style.setProperty('--display-form', 'flex');
  dialog.open = !dialog.open;
}

addNewBook.addEventListener('click', (e) => {
  toggleDialog();
});

closeDialog.addEventListener('click', (e) => {
  toggleDialog();
});

addBook.addEventListener('click', (e) => {
  getInput.forEach(inputItem => {
    if (inputItem.value === '') {
      return;
    }
  });
  toAddBook();
  toggleDialog();
})


document.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (books.length < 5) {
    root.style.setProperty('--book-grid-template', 'repeat(auto-fit, 23.7%');
    return;
  } else {
    root.style.setProperty('--book-grid-template', 'repeat(auto-fit, minmax(23.7%, 1fr))');
    return;
  }
})



