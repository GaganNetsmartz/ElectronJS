const path = require('path');

let books = [];

let booksData = new Storage(path.join(tempPath, '/src/Book/book.json'));
booksData.set('books', books);

console.log("---books----", books)